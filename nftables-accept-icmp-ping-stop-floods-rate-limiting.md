title: NFTables: Allow ICMP pings and stop ping floods with rate limiting
tags: unix, unix-nftables
date: Dec 3, 2015

If you want to allow ping ICMP echo-requests, and you're automatically dropping all except a few selected incoming packets, you'll need to first add a rule:

    nft insert rule inet global input ip protocol icmp \
      icmp type echo-request accept

This rule is as normal as of ``nft insert rule inet global input`` but then we do ``ip protocol icmp`` to say we're interested in the ICMP packets, then ``icmp type echo-request accept`` is very similar to the previous rules ``tcp dport 8888 accept``.

Now we can ping our host. 

However, with ``ping -f``, we're open to ping floods. So let's remove that rule with ``list table inet global -a`` to find its handle and then delete it.

    nft insert rule inet global input ip protocol icmp \
      icmp type echo-request limit rate 1/second accept

This is as before, except we're only allowing 1 a second. 

But there may be a problem if you also have ``ct state established accept`` anywhere in your table since now the echo-requests have an established state, for reasons of which I am not sure.

To get over this, ensure after the rate limiting rule (position 32 is below the icmp rule in my case) we explicitly drop all icmp packets.

    nft insert rule inet global input position 32 ip protocol icmp \
        drop

Notes:

0. The ``ip protocol icmp`` bit is only required in inet tables, not ip -- this may well be a bug/infleicity from what I've seen in 0.5.0 in 3.16
0. The ``ct state established`` biit messing with rate limiting seems odd -- also a bug in 0.5  / 3.16?
