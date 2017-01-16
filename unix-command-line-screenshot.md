title: Linux: How to take screenshots and screen grabs from the command line
tags: unix

If you have `gnome-screenshot` installed, you can type `gnome-screenshot -a` which will screenshot an area of the window you chose.

The parameters `-w` copies the whole window. Without parameters and it will copy the entire window. 

It will be saved into your `Pictures` directory as `Screenshot...`. If you use the `-c` command it's suppose to copy to the clipboard, but there's a bug that prevents this apparently.

If you use the `-i` command, you'll see a dialog with capture options. 

And after the capture, you will see a save box. With this method you will be able to copy to the clipboard with the button provided.

Ensure you're on the window you want to capture, if you use multiple desktops.
