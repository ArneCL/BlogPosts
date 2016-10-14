title: Swift 3 and iOS: Add a loading indicator to a UIButton
tags: ios,swift,ios-uibutton

You can show a loading spinner, a `UIActivityIndicatorView`, within a UIButton, that can be showed and hidden and also changes the button's alpha and interactivity.

First create an extension, then add a `UIActivityIndicatorView` to the button, half its alpha value and disable the button on loading. And then do the opposite when we stop the loading:

    extension UIButton {
        func loadingIndicator(_ show: Bool) {
            let tag = 808404
            if show {
                self.isEnabled = false
                self.alpha = 0.5
                let indicator = UIActivityIndicatorView()
                let buttonHeight = self.bounds.size.height
                let buttonWidth = self.bounds.size.width
                indicator.center = CGPoint(x: buttonWidth/2, y: buttonHeight/2)
                indicator.tag = tag
                self.addSubview(indicator)
                indicator.startAnimating()
            } else {
                self.isEnabled = true
                self.alpha = 1.0
                if let indicator = self.viewWithTag(tag) as? UIActivityIndicatorView {
                    indicator.stopAnimating()
                    indicator.removeFromSuperview()
                }
            }
        }
    }

Stolen from [here] (http://stackoverflow.com/questions/15269264/place-a-uiactivityindicator-inside-a-uibutton/39504623#39504623).
