Title: Unix: Giving sudo rights in Debain
Tags: unix|unix-sudo

To add a user to the sudo group, and ergo have sudo access:

    adduser USERNAME sudo

This works because /etc/sudos has this line

    %sudo   ALL=(ALL:ALL) ALL

That is, everyone is the sudo group may, on ALL hosts, run ALL command. The parts in parenthesis deal with what user and groups the command can be run as.
