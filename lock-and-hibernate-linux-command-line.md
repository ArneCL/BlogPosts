title: Password lock and hibernate linux from the command line
tags: unix, lock

If you want to put your machine into hibernation, and also require a password on coming back up, do this:

    xscreensaver-command -lock && hibernate

You need the ``xscreensaver`` package installed.

And the ``hibernate`` command seemed to appear in 2012.

You may also want to put the lock command in a script, named 'lock', for easier typing:

    #!/bin/bash
    xscreensaver-command --lock
