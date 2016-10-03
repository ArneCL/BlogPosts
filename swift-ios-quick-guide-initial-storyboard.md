title: Swift 3 and iOS: Part 1: Initial storyboard
tags: swift,ios,ios-storyboard

Open up Xcode. I'm on 8.0. Create a new project. Choose Single View Application. Why not? It's simple. We'll build up. And we'll learn more.

On the left hand pane, click on the top icon there, the one that represents our application. In the screen that appears, you'll have a `Deployment info` section. You'll see the `Main Interface` box.

This should reference one of our storyboard files. Let's create a new one, for edification purposes. File -> New -> Storyboard. 

It'll be empty. From the bottom right pane, click on `Object Library` tab. And then drag a `ViewController` into the main Storyboard file. Add a Label or something onto that.

On pane above, click on the `Attributes Inspector` tab. And click, not the label anymore, but the overall `ViewController` on the pane on the left. Back on the right-hand pane, in the attributes inspector, click on `Is Initial View Controller`. This will allow our Storyboard to start this `ViewController` when we launch the Storyboard.

Finally, go back to the click on the top icon again that represents our application, on the left hand pane. Now chose this Storyboard as our `Main Interface`. Run the simulator. We're now presented with our Storyboard on launching the app.

