title: Using inotifywait with a while loop in bash
tags: bash,bash-while,unix-inotifywait,unix
date: Mar 22, 2016

Install `inotify-tools` and then you can wait for a file to change using:

    inotifywait -m thefile.txt

The `-m` flag monitors the file, instead of exiting on the first event. You can use `-e` to wait for a particular event--see the man page.

But you probably want to do something when that happens. You can pipe the output of the command to a bash while loop:

    inotifywait -m thefile.txt | while read file; do echo $file; done

`file` in this case will have the file name and event name, but you don't need to use it obviously.
