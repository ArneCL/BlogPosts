title: Swift 3 and iOS: Choose an image with UIImagePickerController
tags: swift,ios

If you want to use an image from your iOS device, you'll want to use this. First put `Privacy - Photo Library Usage Description` with a string description into your `Info.plist` file.

Next define `let picker = UIImagePickerController()` and in your viewDidLoad() set its delegate as `picker.delegate = self`.

You can start it using:

      picker.allowsEditing = false
      picker.sourceType = .photoLibrary
      self.present(picker, animated: true, completion: nil)

Since we've made our class the delegate, you need to make the class use these protocols: `UIImagePickerControllerDelegate, UINavigationControllerDelegate`.

And we define two methods, one that dismisses the popup and another that grabs our image:

    func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [String : Any]) {
        let chosenImage = info[UIImagePickerControllerOriginalImage] as! UIImage
        // use the image
        dismiss(animated: true, completion: nil)
    }

    func imagePickerControllerDidCancel(_ picker: UIImagePickerController) {
        dismiss(animated: true, completion: nil)
    }
