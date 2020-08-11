title: Paste from the linux/unix command line into graphical applications
tags: unix, unix-paste, unix-xclip
date: Nov 9, 2015

If you've got a large file on the command line, a large CSV file or whatever, you may want to paste that into a graphical application, like Firefox, via the clipboard.

If you install ``xclip`` you can do this easily.

    cat somelargefile.txt | xclip --selection clipboard

The ``--selection clipboard`` saves it to the paste buffer you use in graphical applications. There are others available.
