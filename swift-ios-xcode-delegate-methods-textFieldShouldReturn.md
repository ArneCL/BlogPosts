title: Swift 3, iOS and Xcode 8: Delegate methods, textFieldShouldReturn and hiding the keyboard
tags: swift,ios
date: Oct 6, 2016

Now we've attached a UIController to our Storyboard, we can make the UIViewController a delegate to a UI element.

In the storyboard, control click a EditText to bring up a popup. One of the `Outlets` options will be `delegate`. Drag that to the UIViewController.

Now the UIViewController is the delegate for the UITextField. This means all events for the UITextField will be send to our UIViewController.

One of these events is `textFieldShouldReturn`. Create a new method declared `public func textFieldShouldReturn(_ textField: UITextField) -> Bool`.

(The method is also defind in `UITextFieldDelegate`, but the UIViewController doesn't actually need to implement that whole interface.)

Now when you press return or whatever in the UITextField this method will be called.

You can run the debugger to see when you hit that method. You should turn on the keyboard in the simulator so you can press enter.

Once you're in that method, you can run `self.view.endEditing(true)` to hide the keyboard. 
