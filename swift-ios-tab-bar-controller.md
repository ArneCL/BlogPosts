title: iOS: Xcode 8 and UITabBarController
tags: ios,ios-tabbar

This is almost exactly the same as creating a `UINavivationController`.

First create a normal view controller in your story board, in the left hand pane, click on the icon that represents the view controller, and in the menu bar, under `Editor`, choose `Embed in` and choose `Tab Bar Controller`.

You'll now have a new tab bar controller in your storyboard, with a relationship `view controllers` to your existing view controller. 

Create another normal view controller, and from the tab bar controller control drag to this new one, and create a `view controller` relationship segue.  

In each view controller there'll now be a `UITabBarItem` which allows you to give your tab a title, icon and badge.
