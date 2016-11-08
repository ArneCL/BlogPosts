title: Swift 3 and iOS: Presenting a UIPopoverPresentationController popup
tags: swift,ios

First create a normal view controller in your storyboard. Then in a button click method, or whatever, initialise it:

    let storyboard : UIStoryboard = UIStoryboard(name: "THE_NAME_OF_YOUR_STORYBOARD", bundle: nil)
    let vc = storyboard.instantiateViewController(withIdentifier: "THE_IDENTIFIER_OF_YOUR_VIEWCONTROLLER")

Next set the `modalPresentationStyle` of it to popup, get a reference to the popup presentation controller, make this class its delegate and say it may show only an up arrow.

    vc.modalPresentationStyle = .popover
    let popover = vc.popoverPresentationController!
    popover.delegate = self
    popover.permittedArrowDirections = .up

Next set the source view and rect to whatever initialise the popup. In my case it's a sender object in a touch listener.

    popover.sourceView = sender as? UIView
    popover.sourceRect = sender.bounds

Finallly present it with `present(vc, animated: true, completion:nil)`. It will take up the size of a new screen, unless we're on an iPad, regardless of our source rect and view.

To ensure we only take up the space under the aforementioned button, add this delegate method:

    func adaptivePresentationStyle(for controller: UIPresentationController, traitCollection: UITraitCollection) -> UIModalPresentationStyle {
        return .none
    }

It may not take up all the space of a new screen, but it will still take up everything below the button. 

You can size the view controller with `use preferred explicit size checked` or do something like `vc.preferredContentSize = CGSize(width: 200, height: 100)`, but I'd like a better method...
