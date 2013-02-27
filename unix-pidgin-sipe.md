Title: Pidgin with Office Communicator - Sipe: Read Error
Tags: unix|unix-pidgin
Date: 2012-12-12 05:47:23 -0500 
Author: Denevell

In Debian Wheezy, you can install the Lync / Office Communicator / Sipe plugin for Pidgin.

But, even with the correct login information you get a Read Error when trying to connect.

You need to set an environmental flag before running Pidgin to overcome this. Here's a script that does it:

     export NSS_SSL_CBC_RANDOM_IV=0
     pidgin
    
