title: Swift 3 and iOS: Segues
tags: ios,swift

Let's say you've control click dragged from a UIButton to another UIViewController in your storyboard. You've now created a segue.

Click on it, and in the attributes inspector tab, name its identifier `segue1`.

In your view controller from which you're leaving for the new one, add this:

    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        if (segue.identifier == "dashboardToDocuments") {
            let detailVC = segue.destination as! SomeViewController;
            detailVC.someValue = "JOHN COLTRANE"
        }
    }

This says for the identifier `segue1` which we named above, cast the UIViewController to `SomeViewController`, the name of our destination view controller.

Then set a property on that view controller, named simply via `var someValue = "blar"` for example in your destination controller.
