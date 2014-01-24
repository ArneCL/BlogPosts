title: Unix: Setup multiple monitors in Xorg with the command line
tags: unix,unix-xrandr

If you've plugged an external monitor into your machine, Xorg's xrandr should tell you about it:

    $ xrandr 
    Screen 0: minimum ..., current ..., maximum ...
    eDP1 connected ... (normal left inverted right x axis y axis)
       ...
       1024x768       60.0  
       800x600        60.0  
    VGA1 disconnected (normal left inverted right x axis y axis)
    HDMI1 disconnected (normal left inverted right x axis y axis)
    DP1 connected ... (normal left inverted right x axis y axis) 
       ...
       1024x768       75.0
       800x600        75.0
       
So we've got DPI and eDPI. We can also use xrandr to say output to the external monitor, DP1 in this case.

    xrandr --output DP1 --mode 1024x768
    
This will clone your monitor. Add the argument --right-of ePD1 to make the new monitor extend the current.
