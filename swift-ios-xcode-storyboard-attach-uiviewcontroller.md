title: Swift 3, Xcode 8 and iOS: Part 5: Connect a UIViewController 
tags: swift,ios

Now we've been through how to start a storyboard on application launch, and how to use auto layout to align the ui elements by margins and other elements, we'll get onto connecting those elements to code.

First off, go to your storyboard, click on your view controller, and on the right pane, click on the `Identity inspector` tab. In the `Custom class` section, in the drop down for `Class` you should be able to choose a `UIViewController` class that either Xcode made for you, or one you created yourself.

If you're making it yourself, `class YourViewController : UIViewController {}` is the definition. You can also add `override func viewDidLoad() { super.viewDidLoad() }` if you want to detect when the view controller is loaded.
