Title: Unix: Using iptables
Tags:  unix-iptables,unix

First create a ipfilters firewall file. Call it ipfilter.firewall.rules for example. Here's an example: http://library.linode.com/securing-your-server#sph_creating-a-firewall

* -A means append the rule to the end of the table with the table specified, such as INPUT. 
* -j means perform this action on matching the rule, REJECT for example.
* -i specifies the interface to listen on. 
* -d specifies the destination including the network mask.
* --dport specifies the destination port
* -p specifies the protocol, such as tcp

You can then set it as your firewall like so:

	iptables-restore < iptables.firewall.rules

Then you can list all the added rules via

	iptables -L
