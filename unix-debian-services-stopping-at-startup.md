Title: Debian: Stopping a service from starting at startup
Tags: unix|unix-debian|unix-debian-services
Date: 2012-12-23 08:17:29 -0500 
Author: Denevell

To remove a service, apache2 in this case, from running at all runlevels:

     update-rc.d -f apache2 remove

This will remove the apache2 file (located in /etc/init.d/) symlink from all the /etc/rcX.d/ directories.

To simply stop a service:

     service apache2 stop

You can replace stop with start to start it.
