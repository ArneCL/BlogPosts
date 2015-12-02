title: NFTables: Basic rules, inserting, deleting, established packets and saving
tags: unix,nftables

Now we've done the basic NFTables [setup](http://blog.denevell.org/nftables-setup-tutorial-debian.html), let's make and state some basic rules.

Let's make the global table and input ruleset again if we haven't already:

    nft add table inet global
    nft add chain inet global input { type filter hook input priority 0 \; }

Let's first open port 22, since we're SSHing into our box:

    nft add rule inet global input tcp dport 22 accept

Now we can drop all the rest:

    nft add rule inet global input drop

Let's insert an ESTABLISHED rule before the drop rule, or right at the top in our case, that allows our incoming packets -- when we request a webpage for example -- to receive packets from the external server:

    nft insert rule inet global input ct state established accept

(You may want to add the ``related`` state to accept if you're using FTP etc)

Finally let's insert some standard rules for allowing http etc. We'll use the positional handle indicators -- position 8 in my case -- for the insertion place via using ``nft list table inet global -a``.

    nft insert rule inet global input position 8 tcp dport {80, 8080, 443} accept

(Note the spaces after each comma)

We can now list the table and get:

    table inet global {
            chain input {
                    type filter hook input priority 0; policy accept;
                    ct state established accept # handle 14
                    tcp dport { https, http, http-alt} accept # handle 16
                    tcp dport ssh accept # handle 8
                    drop # handle 4
            }
    }

If you wanted to delete the last rule, handle 16, we'd do ``nft delete rule inet global input handle 16``.

Let's save the ruleset (the -n gives us numbers for the ports) and flush/delete the chain and table:

    nft -n list -n table inet global -a > fw.ruleset
    nft flush chain inet global input
    nft delete chain inet global input
    nft delete table inet global

In 3.18 of the kernel and upwards, you can just delete the table without first flushing and deleting the chain, but alas.

Now if we list the tables ``nft list tables`` we'll see nothing, which is what we want. Now let's load the saved rules back in and list them:

    # nft -f fw.ruleset 
    # nft list table inet global
    table inet global {
            chain input {
                    type filter hook input priority 0; policy accept;
                    ct state established accept 
                    tcp dport { https, http, http-alt} accept 
                    tcp dport ssh accept 
                    drop 
            }
    }
