title: List names of wifi networks on the command line
tags: unix,wifi

This small script -- to be run as the superuser or someone with permissions to run iwlist -- will give you a list of the networks available.

    iwlist wlan0 scan | grep 'ESSID' | sed 's/.*ESSID:"\(.*\)".*/\1/g'

Put it in a executable file in a bin directory.

Sometimes, you'll get the message

    wlan0     Interface doesn't support scanning : Device or resource busy

And this normally goes away eventually, retrying the command.
