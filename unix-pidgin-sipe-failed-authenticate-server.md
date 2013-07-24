title: Pidgin with Office Communicator - Failed to authenticate to server

After upgrading Pidgin and Sipe on Debain wheezy I came across:

    Failed to authenticate to server
    
Desipe my password having not changed.
    
It turns out you need to disable "Use Single Sign-on" in the Advanced properties.

The Sipe plugin's website has a good FAQ dealing with problems therein: http://sourceforge.net/p/sipe/wiki/Frequently%20Asked%20Questions/
