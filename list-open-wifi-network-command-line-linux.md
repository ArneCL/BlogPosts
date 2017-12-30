title: List the open wifi networks from the linux command line
tags: wifi

If you want to use the command line and `iwlist scan` to list all the open wifi networks you can:

```
a=`iwlist wlan0 scan | grep 'ESSID\|key:' | sed 's/.*ESSID:"\(.*\)".*/\1/g' | sed 's/.*key:\(.*\).*/key:\1/g' | sed 's/\n//'`
```

This first lists all the networks and grabs the network name and whether there's a key on this network.

This gives us a list of network's key state and the network name.

Let's now join the network key state and the network name into one line with `sed 'N;...` and swap the variables around to show the network name first.

```
echo "$a" | sed 'N;s/\n/,/' | awk -F ',' '{print $2" ("$1")"}'
```

Put these two lines in a bash script and run that to see all the networks and whether they're open networks or not.
