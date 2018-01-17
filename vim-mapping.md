title: Remapping vim commands
tags: vim

Let's take the command Control W <. This expands the left hand window in a split window.

The only problem with this is that you must first press control w, then shift, and then ,. At least on my keyboard.

Let's remap this Control w < to Control w ,. This will save us pressing the shift key.

```
:nmap [press control v][press control w], [press control v][press control w]<
```

You can also put this in your .vimrc file for activation on startup. 

Pressing control v allows you to then enter a control key in the command. 

The `n` is nmap means this only applies in normal mode.
