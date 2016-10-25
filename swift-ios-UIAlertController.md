title: Swift 3 and iOS: Using a UIAlertController
tags: ios,swift,ios-uialertcontroller

An `UIAlertController` is a alert popup, to which you can add buttons and text, and sub views if you wish. It can also act as a bottom sheet.

You create it programatically with:

    let alert = UIAlertController(title: "Do something", message: "With this", preferredStyle: .actionSheet)
    alert.addAction(UIAlertAction(title: "A thing", style: .default) { action in
        // perhaps use action.title here
    })

The `addAction` method adds a `UIAlertAction` which will act like a button. You can give it various styles, as with the alert controller above. The final anonymous function is called when this action is pressed.

Finally, you show it with `self.present(alert, animated: true)`.
