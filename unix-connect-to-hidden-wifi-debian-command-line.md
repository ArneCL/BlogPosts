title: Unix: Connect to a hidden WIFI network with Debian from the command line
tags: unix,wifi

For some reason, putting a hidden WIFI network in `/etc/network/interfaces` doesn't work -- at least not if you do it the same way you do visible networks, perhaps.

However, you can do it without `if-up` and `/etc/network/interfaces` and get it working.

For example, with a WPA2 network, you can initially connect to a network via:

    iwconfig wlan0 essid YOUR_HIDDEN_NETWORK key s:YOUR_PASSWORD

I encountered the below error, although it seems you can just ignore it.

    Error for wireless request "Set Encode" (8B2A) :
        SET failed on device wlan0 ; Invalid argument.

From this point, `iwconfig` should show you're connected to the ESSID, at least. Then run this to setup DHCP:

    dhclient wlan0

And again, an error appears,`RTNETLINK answers: File exists`, which I found I can ignore, as it seems to be saying you're overwriting your previous DHCP settings.
    
If you run, `iwconfig` you should see an ESSID and Access-Point etc and `ifconfig` should show you your IP.

And you should--hopefully--now be connected to the internet.
