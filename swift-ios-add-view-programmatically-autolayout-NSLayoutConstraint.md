title: Swift 3 and iOS: Add views programmatically with NSLayoutConstraint and AutoLayout
tags: ios,swift,ios-autolayout

You can add a view programmatically in a fixed position easily enough:

    self.edgesForExtendedLayout = [] // This ensures your view is below the navigation bar
    ...
    let rect = CGRect(origin: CGPoint(x:0, y:0), size: CGSize(width:50, height:50))
    var label = UILabel(frame: rect)
    label.backgroundColor = UIColor.red
    label.text = "label text"
    self.view.addSubview(label)

However, if you use autolayout with `NSLayoutConstraint` then it's the same as above but without the rect stuff, i.e. `var label = UILabel()`. You need to set `translatesAutoresizingMaskIntoConstraints` on the `label` to false to enable autolayout apparently. You then create layout constraints, for example:

    NSLayoutConstraint(item: label, attribute: .centerX, relatedBy: .equal,
                       toItem: view, attribute: .centerX,
                       multiplier: 1.0, constant: 0.0)

The first line mentions the view you want it applied to, the attribute you want to constrain, and how it's related to another. The second line says what we're relating to, that relation's attribute. We'll ignore the last line for the moment.

So you're saying "for the item `label`, relate its central x position to equals the central x position on `view`." The below is saying "For the item `label`, relate its height to equal the height of `view`, for 95%."

    NSLayoutConstraint(item: label!, attribute: .height, relatedBy: .equal,
                       toItem: view, attribute: .height,
                       multiplier: 0.95, constant: 0.0)

Finally you add the contraints to your view: `view.addConstraints([constraint1, constraint2, constraint3, constraint4])`. The full example is:

     override func viewDidLoad() {
          super.viewDidLoad()

          self.edgesForExtendedLayout = []

          self.label = UILabel()
          self.label?.translatesAutoresizingMaskIntoConstraints = false
          self.label?.backgroundColor = UIColor.red
          self.label?.text = "label text"
          self.view.addSubview(self.label!)

          let horConstraint = NSLayoutConstraint(item: label!, attribute: .centerX, relatedBy: .equal,
                                                 toItem: view, attribute: .centerX,
                                                 multiplier: 1.0, constant: 0.0)
          let verConstraint = NSLayoutConstraint(item: label!, attribute: .centerY, relatedBy: .equal,
                                                 toItem: view, attribute: .centerY,
                                                 multiplier: 1.0, constant: 0.0)
          let widConstraint = NSLayoutConstraint(item: label!, attribute: .width, relatedBy: .equal,
                                                 toItem: view, attribute: .width,
                                                 multiplier: 0.95, constant: 0.0)
          let heiConstraint = NSLayoutConstraint(item: label!, attribute: .height, relatedBy: .equal,
                                                 toItem: view, attribute: .height,
                                                 multiplier: 0.95, constant: 0.0)

          view.addConstraints([horConstraint, verConstraint, widConstraint, heiConstraint])
      }
