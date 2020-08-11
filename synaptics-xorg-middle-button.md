title: Xorg: Enable middle mouse button with Synaptics
tags: unix-xorg,unix-synaptics,unix
date: Jan 17, 2018

Type this in `synclient TapButton3=2`.

That means when the trackpad is tapped three times the second, the middle, mouse button is activated.

You may want to put that in your .xinitrc file.
