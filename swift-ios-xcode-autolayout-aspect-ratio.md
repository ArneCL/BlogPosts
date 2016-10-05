title: Swift 3, iOS and Xcode 8: Part 4: Autolayout with ratios
tags: ios,ios-storyboard

Let's learn autolayout's ratios features: this allows us to say a UI element should fill up a certain amount: half its container vertically, for example.

First create a label, give it a coloured background. Put it in the rough centre of your screen.  Control drag it a little into its parent view, and from the popup select `aspect ratio`. 

In the right pane, under the view, they'll be a `Constraints` blue icon, with an arrow to expand, which you should press. Select the new constraint, and in the `Attributes inspector` tab in the right hand pane, you'll see `First item`, `Relation` and `Second item`.

The first item should be our label with the width property, the relation should be `equals` and the second item should be the super view with the width property. If they're not like that, change them so they are.

Below that list of boxes, there's a `multiplier` box. Putting 0.75 in it would mean we want our width to be 0.75 of the superview's width. Do that.

Xcode should be bitching to you by now about the label having no x or y position. As we learnt a couple of tutorials ago, align the label to top left margin.

Now if you open the simulator in both iPad, iPhone 5 etc, you'll always have the label taking up 0.75 of the parent view.
