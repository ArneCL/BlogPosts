title: Swift 3, Xcode 8 and iOS: UINavigationController basics
tags: swift,ios,ios-navigationcontroller

The `UINavigationController` allows you to navigate back to a view controller from child view controllers using a back button.

First create a UIViewController with a button. Then select this in the left hand side hierarchical pane, then click `Editor` in the window menu, `Embed in` and then choose `Navigation Controller`.

They'll be a new `UINavigationController`, with a `root view controller` relationship link from that to your first view controller. They'll be a styleable `UINavigationBar` within this UINavigationController.

Create another view controller, and control drag from the button you created button in your first view controller to this new view controller, to create a show action segue.

On starting the app, it will load the `UINavigationController` (or should do, depending how you've setup your app), which will the start the first view controller. From there, when you press the button it'll load your third controller.

You should of course see a navigation bar at the top of each view. And when you get into the third view, you should see a back button you can use.

In your initial view controller, they'll also be a `UINavigationItem`, which you can use to set the title of your view controller and the name of the back button used when coming back.

Also, at the same level as the `view` in the third view controller, you can add `UINavigationItem` and give that a title too. And in of your view controllers, unclicking `Adjust scroll view insets` may help if your content is being pushed down.
