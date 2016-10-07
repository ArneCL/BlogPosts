title: Swift 3, iOS and Xcode 8: Tabbing between text views
tags: swift, ios

The horror of development for iOS is that when you have a list of text views, and you press enter or whatever on one, it does not automatically tab to the next text view.

You can set a delegate method for the text field that is called on return key pressed. That gives focus to each next text field. These next fields are defined and assigned manually in the view controller. And there are loads of if statements. And you do this for each view controller. But that is tedious.

Let's instead look at this delegate method, called when enter or whatever is pressed, wrapped in an extension for UIViewController, instead:

    extension UIViewController {
        func textFieldShouldReturn(_ textField: UITextField) -> Bool {
            if(textField.nextField == nil) {
                textField.resignFirstResponder()
            } else {
                textField.nextField?.becomeFirstResponder()
            }
            return true
        }
    }

It checks if the next field has a `nextField` property. If it does, it gives focus to that text field. If it has none, it resigns the first responder, thereby closing the keyboard.

But `UITextField`'s don't have this `nextField` property. But we can make them do so with the code below. This is another extension on a `UITextField` and it defines a new property, our `nextField` which is an `@IBOutlet` so we can assign to it in our storyboard.

    extension UITextField {
        @IBOutlet var nextField: UITextField? {
            get {
                return objc_getAssociatedObject(self, &kAssociationKeyNextField) as? UITextField
            }
            set(newField) {
                objc_setAssociatedObject(self, &kAssociationKeyNextField, newField, .OBJC_ASSOCIATION_RETAIN)
            }
        }
    }

Within each getter and setters we use `objc_{set,get}AssociatedObject`. This either gets or assigns our `nextField` to the our text field, using a key, which is just a `private var kAssociationKeyNextField: String = ""` living outside the extension which we use for a random address.

Now if you set the TextField's delegate to be a UIViewController, and also set its new `nextField` property to point to the next text field in our storyboard, then all is well with the world.

I've stolen this solution from [here](http://stackoverflow.com/posts/27030181/revisions).

