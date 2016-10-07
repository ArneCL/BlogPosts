title: Swift 3 and iOS: Using the notification center
tags: swift,ios,ios-notification-center

The notification center allows you to send out events and receive them in methods. Let's say we've defined a notification like this: `let notif = Notification.Name.init(rawValue: "Ladies And Gentlemen We Are Floating In Space")`. We can create an observer for that via:

    NotificationCenter.default.addObserver(self,
                                           selector: #selector(OurViewController.sup),
                                           name: notif,
                                           object: nil)

This say let's take the default notification center, and call the method `sup` on `OurViewController`, passing in `self` and the instance of our referenced view controller.

We then give it our notification we first defined. And an optional object that could be the sole source of our notifications - we're taking in them from anywhere, so no need.

We then send the notifcation via `NotificationCenter.default.post(name: notif, object: nil)`. We're not passing an optional object, but we could. Then our `sup` method is as below.

    func sup(notification: Notification) {
        print("Hello. Is it me you're looking for?")
        print(notification.name)
        // Had we passed on optional object, we'd get it from the notification object.
    }
