title: Swift 3 and iOS: Go to a new UIViewController
tags: swift,ios

Let's say you have a UIViewController. And another, separate Storyboard, named `NewSB`. And, in that, another UIViewController, also named `newUIC`.

You can present that from your current view controller with:

    let sb = UIStoryboard(name:"NewSB", bundle: nil)
    let uis = sb.instantiateViewController(withIdentifier: "NewUIC")
    self.present(uis, animated: true, completion: nil)

The name of the view controller is set in `Storyboard ID` panel in the identity inspector. `NewSB` is just the filename of the storyboard.
