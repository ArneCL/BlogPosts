title: Swift 3 and iOS: Resizing the scroll view on keyboard appearance
tags: swift,ios

One of the horrible things about iOS development is that the screen size does not resize on keyboard appearance.

If the content of your view isn't big enough to fit the size of the screen when the keyboard appears, much of your content will be off screen.

You can use a scroll view in your layout to allow the user to scroll the content. However, when the keyboard appears the scroll view height won't be decreased, so you still won't be able to scroll your content.

Let's change this by first notifying our UIViewController when the keyboard both appears and disappears with the Notification Center:

      func setupViewResizerOnKeyboardShown() {
          NotificationCenter.default.addObserver(self,
                                                 selector: #selector(UIViewController.keyboardWillShowForResizing),
                                                 name: Notification.Name.UIKeyboardWillShow,
                                                 object: nil)
          NotificationCenter.default.addObserver(self,
                                                 selector: #selector(UIViewController.keyboardWillHideForResizing),
                                                 name: Notification.Name.UIKeyboardWillHide,
                                                 object: nil)
      }

Now in the `keyboardWillShowForResizing` function above, let's get the keyboard size via the `UIKeyboardFrameEndUserInfoKey` property on the notification's `userInfo` and the window's frame.

      func keyboardWillShowForResizing(notification: Notification) {
          if let keyboardSize = (notification.userInfo?[UIKeyboardFrameEndUserInfoKey] as? NSValue)?.cgRectValue,
             let window = self.view.window?.frame {
              // We're not just minusing the kb height from the view height because
              // the view could already have been resized for the keyboard before             
              self.view.frame = CGRect(x: self.view.frame.origin.x,
                                          y: self.view.frame.origin.y,
                                          width: self.view.frame.width,
                                          height: window.origin.y + window.height - keyboardSize.height)
          } else {
              debugPrint("We're showing the keyboard and either the keyboard size or window is nil: panic widely.")
          }
      }

Once we've got those two things, we set the height of the view's frame by taking the height of the window and subtracting the keyboard height.

Now in our `keyboardWillHideForResizing`, let's get the keyboard height again and set the frame's height as that plus the current height of the view:

      func keyboardWillHideForResizing(notification: Notification) {
          if let keyboardSize = (notification.userInfo?[UIKeyboardFrameEndUserInfoKey] as? NSValue)?.cgRectValue {
              let viewHeight = self.view.frame.height              
              self.view.frame = CGRect(x: self.view.frame.origin.x,
                                       y: self.view.frame.origin.y,
                                       width: self.view.frame.width,
                                       height: viewHeight + keyboardSize.height)
          } else {
              debugPrint("We're about to hide the keyboard and the keyboard size is nil. Now is the rapture.")
          }
      }

Wrap these three methods in a `extension UIViewController {}` and you can then just call `setupViewResizerOnKeyboardShown()` in your view controller's `viewDidLoad()` method.

This is stolen from [stackoverflow](http://stackoverflow.com/questions/13161666/how-do-i-scroll-the-uiscrollview-when-the-keyboard-appears).
