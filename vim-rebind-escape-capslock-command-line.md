title: Vim: rebind escape and caps lock on the command line
tags: vim,unix

If you are using vim a lot, and touch type, you may find reaching up to press escape all the time ruins your typing.

You can rebind escape to caps lock, and vice versa, throughout all your X apps using `xmodmap`.

Use this in `~/.Xmodmap`

```
clear Lock
keycode 9 = Caps_Lock
keycode 0x42 = Escape
```

And then use the command, probably in your `~/.bashrc`, `xmodmap ~/.Xmodmap` to do the rebind.
