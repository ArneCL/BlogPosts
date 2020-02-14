title: NFtables basics
tags: unix,nftables

NFtables replaces the iptable firewall tools in Linux. It should make things nicer. But let's step back and talk about how firewalls are organised.

**Background**

Firewalls are made up of rules. An example is "allow incoming connections on port 22". Rules are organised into chains. There are two main chains, input and output. Rules on the input chain relate to incoming connections. Rules on the output chain relate to outgoing connections. A table is a collection of chains.

We can make our own table and chains. Our chains will hook onto the default input or output chain. Linux will see an incoming connection. It will consult the default input chain. That input chain will then consult our chain. 

**Allowing ports**

So let's look at the format of `nft` commands: `nft THE_COMMAND inet THE_TABLE THE_CHAIN THE_CHAIN_COMMAND`. 

After `nft` you type the command name, then then you specify the table name (but with inet before because the table will be a ipv4/6 table), then the chain name, then the chain command. In short: the command, inet plus the table name, the chain name and the chain command. 

Let's make our table and chain, the chain that will **hook** onto the default input chain and **filter** things on that.

```
nft add table inet mytable
nft add chain inet mytable myinputchain { type filter hook input priority 0 \; }
```

Let's add rules to allow SSH on port 22 and HTTPS on 442 and drop everything else. The chain command format is: type tcp, then dport and the number and finally the accept/drop.

```
nft add rule inet mytable myinputchain tcp dport {443, 22} accept
nft add rule inet mytable myinputchain tcp drop
```

**Inserting rules and allowing established connections**

But we forgot to add a rule before drop. We want to add one before that but first we need to know the nft position of the rule above drop. We can do that with `nft list table inet mytable -a -nn`:

```
table inet mytable {
	chain myinputchain {
		type filter hook input priority 0; policy accept;
		tcp dport 22 accept # handle 2
		tcp dport 443 accept # handle 3
		drop # handle 4
	}
}
```

So we know it's handle `3` now. We will type `position 3` before our chain command.

When we establish a connection to the outside world, the outside world will want to talk to us, but our firewall will reject it because it won't send us things on port 443 or 22. We need to track the connections (`ct`) we make, and look at the state of the connection, and if we've established it, then allow it.

```
nft add rule inet mytable myinputchain position 3 ct state established accept
```

**Saving and restoring rules**

Let's save our list with `nft list table inet mytable -a -nn > fw.ruleset`, clear our nft table with `nft delete table inet mytable`, see nothing is there by looking at `nft list tables`, then reload it with `nft -f fw.ruleset` and then check all the rules are there.

**Allowing pings and rate limiting**

We should allow pings. Our table is a ipv4/ipv6 table so we need to specify that we're interested in the icmp protocol, then the type of icmp packet that interests, then we set a rate limit to stop ping flood, then accept. After this we drop any icmp packet else the established packet rule will accept the ping floods.

```
nft add rule inet mytable myinputchain position <..before drop..> ip protocol icmp icmp echo-request limit rate 1/second accept
nft add rule inet mytable myinputchain position <after the above> ip protocol icmp drop
```

**Allowing the loop back device**

Local programs communicate with the computer using the loopback device. Let's allow that. We use the `meta` command to look at the networking packets, and look at the interface name with `iif`. After this we should be able to ping localhost.

```
nft insert rule inet mytable myinputchain position 2 meta iif lo accept
```
