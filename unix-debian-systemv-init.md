Title: Unix: Systemv init system (Debian) tutorial
tags: unix,debian,systemvinit

The systemv init system is used in Debian and many other distributions, although will be replaced by systemd in Jessie or later I believe.

System scripts live in /etc/init.d and these are simple executable shell scripts that take a paramter and perform actions. Systemv init demands they take in a 'start' and 'stop' parameter and start their service.

Systemv init has various run levels. A run level is simply a state in which your system has certain services running. 

Level 1 is sinle user mode where there are few services running. Level 0 is when the system is getting ready to be shutdown, i.e. the services are being stopped. Level 6 is similar to level 0 except the system is getting ready for a reboot. Level 2-5 are multi-user levels and are generally the same in most distributions. There's special level 'S' which is run when the system is starting.

Each runlevel defines its services in /etc/rc[RUNLEVELHERE].d/ as symlinks to the services located in /etc/init.d/. If the syslink is of the form S01servicename then the service is started in that level. If it's of the form K01servicename then the service is stopped. The numbers in the names define the order in which the services are started.

Services on debain are managed by the update-rc.d program.

To add a service symlinks to the default run levels, ie. K01tomcat7 in /etc/rc[0,1,6].d/ and S01tomcat7 in the other, /etc/rc[2-5] directories, run

	update-rc.d tomcat7 defaults

* To remove the service symlinks from the runlevel directories, run

		update-rc.d -f tomcat7 remove

Note that on updating the package, it will re-run update-rc.d to reinsert the links if they're not in the runlevels, so you're better of disabling instead.

* To disable a service from the runlevels, run

	update-rc.d -f tomcat7 disable

This will turn all the S16tomcat7 links in the runlevels to K01tomcat7 links, thereby disabling the service.

You'll get a warning about the service being disabled, when the LSB headers in the init.d/ file says it should be enabled.

* To enable a service, run

	update-rc.d -f tomcat7 enable

This will ensure all the links in the rc[2-5].d/ are in the form S14tomcat7, thereby starting the service in those levels. If the service itself tells you what runlevels to start and stop in its script, update-rc.d will use that.

