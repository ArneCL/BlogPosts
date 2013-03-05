If you're not using KDE or Gnome, you may want a command to lock the screen. 

    xscreensaver-command -lock

does just that. If you mix that with pm-suspend, your screen will be locked when you come back from suspend or hibernate:

  xscreensaver-command -lock && pm-suspend

Putting that in a bash file may be a little easier on the fingers.
