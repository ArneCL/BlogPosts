title: Unix: GNU screen config
tag: unix,unix-gnu-screen,unix-gnu-screen-config

In your .screenrc file:

		startup_message off
		hardstatus alwayslastline
		hardstatus string "%{= kw}%-w*%n %t%+w"

This turns of the startup screen. 

It gives you a status line at the bottom. That is of the background color (%{= kw}) white (w) on black (k). The currently active tab has a star before it (%-w*). The layout of the tab title is its number and then its title (%n %t%+w).

Goddamn voodoo.
