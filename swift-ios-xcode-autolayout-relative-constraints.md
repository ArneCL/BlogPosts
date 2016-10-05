title: Swift 3, iOS and Xcode 8: Part 3: Autolayout and relative contraints
tags:ios,ios-storyboard,ios-autolayout

Previously, we constrained a button based on app margins. We can do the same with other elements.

Add another button to the screen. Control drag from that to the other button we have. Then select `Vertical spacing`. A new constraint will be added to the Left pane under the views.

Click on that, and on left hand pane, click on the sizing tab. You can now change the value of the spacing. Change `Constant to 16`. 

Now when you run the simulator, you can see the button is 16 pixels above the other button.

If you control drag from a ui element to a container, like the root container, then you'll have the option to centre vertically or horizonally align, too.
