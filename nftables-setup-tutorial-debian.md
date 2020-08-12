title: NFTables: setup and basic tutorial in Debian
tags: unix, unix-nftables
date: Dec 1, 2015

First get an external host with a Linux distribution on it with a recent kernel. I'm using Debian Jessie with 3.16 (later kernels will be fine).

    # uname -r
    3.16.0-4-amd64

For debian jessie, we'll need the nftables packages which resides in backports. This should be in your /etc/apt/sources.list

    deb http://mirrors.kernel.org/debian/ jessie-backports main contrib

Then we can install nftables. Install apache or whatever also, so we can test out filtering.

    # apt-get install nftables apache2

I'm using this version of nftables (Warning: things may change with later verseions)

    # nft --version
    nftables v0.5 (Support Edward Snowden)

Now test we can see apache by going to the host's IP address. 

Let's setup nftables by first defining a table -- we'll just call it global -- and then a chain, in which we'll place our rules:

    # nft add table inet global
    # nft add chain inet global input { type filter hook input priority 0 \; }

(The ``inet`` part says this is for both ipv4 and ipv6.)

The add table command is simple enough. Then the chain ``input`` is added to the global table, and within the curly brackets we say we're a filter chain that's hooking onto the input hook, with a high priority. (the semi-colon is escaped when we use bash)

Next let's add a rule to allow SSHon port 22:

    # nft add rule inet global input tcp dport 22 accept

Again, we're adding a rule to the global table and the input chain. We then use the accept on the tcp destination port 22. We can how list out commands: 

    # nft list table inet global
    table inet global {
            chain input {
                    type filter hook input priority 0; policy accept;
                    tcp dport ssh accept 
            }
    }

Let's make sure we're dropping everything else, by adding the drop command to the end of the list:

    # nft add rule inet global input drop
    # nft list table inet global
    table inet global {
            chain input {
                    type filter hook input priority 0; policy accept;
                    tcp dport ssh accept 
                    drop 
            }
    }

Now if we try to reach apache we'll find we can no longer. Let's add a rule that allows it.

First we'll find the handle with the ``-a`` param, then insert the http rule before that.

    # nft list table inet global -a
    table inet global {
            chain input {
                    type filter hook input priority 0; policy accept;
                    tcp dport ssh accept # handle 2
                    drop # handle 3
            }
    }
    # nft insert rule inet global input position 3 tcp dport 80 accept
    # nft list table inet global
    table inet global {
            chain input {
                    type filter hook input priority 0; policy accept;
                    tcp dport ssh accept 
                    tcp dport http accept 
                    drop 
            }
    }

There's obviously plenty more you can do, but this just sets things up. This also doesn't save the tables once the system goes down.
