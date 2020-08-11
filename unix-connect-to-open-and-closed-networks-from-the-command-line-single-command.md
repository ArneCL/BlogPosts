title: Linux: Connect to open and closed networks from the command line with a single command.
tags: unix,unix-wifi
date: Feb 13, 2018

You can easily connect to an open network though

```
iwconfig wlan0 essid "THE NETWORK NAME"
```

Closed networks work with wpa_supplicant. You normally send a configuration file with that but you can simulate the file with a named pipe:

```
wpa_supplicant -iwlan0 -c <(echo -e 'network={\n ssid="THE NETWORK NAME" \n psk="THE PASSWORD" \n}') -B
```

`wlan0` is your network interface name. `-B` means go into the background. The `\n`s in the configuration file is needed sadly and so we pass `-e` to `echo` to interpret them.

`iwconfig` should show your new connection but prehaps only after a second.

After this `dhclient wlan0` will get you a dhcp address and you'll be ready to go. You may want to kill any prior instances of `dhclient`.
