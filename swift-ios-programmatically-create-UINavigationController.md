title: Swift 3 and iOS: Programatically create a UINavigationController
tags: swift, ios, ios-UINavigationController

First create the `UINavigationController`, giving it a `rootViewController` as your controller to display.

Then create a `UIBarButtonItem` with a button and action select target as a method in your class.

Then add that to your UINavigationController's topViewController's navigationItem.

    let navigationController = UINavigationController(rootViewController: YOUR_CONTROLLER)
    let btnDone = UIBarButtonItem(title: "Done", style: .done, target: self, action: #selector(dismissNav))
    navigationController.topViewController?.navigationItem.rightBarButtonItem = btnDone

The referenced selector would look like this:

    func dismissNav() {
        self.dismiss(animated: true, completion: nil)
    }
