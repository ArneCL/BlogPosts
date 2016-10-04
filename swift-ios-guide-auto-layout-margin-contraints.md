title: Swift, Xcode 8 and iOS: Part 2: Auto layout and margin constraints
tags: swift,ios,ios-storyboard,ios-autolayout

Before we do any coding, we'll work out how to use auto layout. Auto layout is the ability to expand/pin elements to the width, height etc of the varying screen sizes of iOS devices.

Go to your story board. On the right hand pane, open the file inspector tab. In the interface builder document section, ensure `Use auto layout` is clicked.

Now add a button to your layout. Place it near the bottom of the screen, in the left hand corner.

Normally, when you show this on a bigger device, the button won't be at the bottom of the screen, but only at pixel 410 or whatever is standard on the screen size for which you're designing.

Let's add an auto-layout constraints to change this. In the toolbar below the main design screen, there's a little button that looks like a square X-Wing. It's called `pin`. Click it. It should popup a dialogue.

First, uncheck the `constrain to margins` button. I don't know what it means. I've been told to uncheck it. You should see a little graphic with four boxes around it, left, right, top, bottom.

Insert 16 in the left and right box and 20 in the bottom box. And click the little red lines. The button at the bottom should now say `Add 3 contraints`. Click that.

Open the app in different screen sizes via the simulator. The button should now expand at the bottom of the screen.

It will place it there irrespective of the actual width of the button that you set, or the vertical location: the auto layout constraints override that. 

You can also click on the button on next to `pin`, which gives you update frames and update constraints options, which updates the views based on the auto layout values.
