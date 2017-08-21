title: Unix: Change the keyboard layout using a key switch
tags: unix

If you want to type using another keyboard quickly you can use `setxkbmap` to change your X windows keyboard using a keymap.

Let's say you want to switch from a us keyboard to a french keyboard. Use `setxkbmap us,fr -option grp:ralt_shift_toggle`

Then press right alt and shift together to switch between the two. I hold shift then tap `alt gr`
