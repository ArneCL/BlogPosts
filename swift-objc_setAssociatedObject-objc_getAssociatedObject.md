title: Swift 3: objc_setAssociatedObject and objc_getAssociatedObject
tags: swift

You can associate one object, like a string, with another, like a class. This is as you would a property, but without touching the internals of the initial object.

Let's say you have a class, `class athing {}` and have initialised that, `let a = athing()`. We're going to associate a string to that class.

First we need to define a key for this new associated object. It can be anything at all: we'll be using it's memory address not its value, so: `var key = ""` will do, or `var key = 0`.

Now let's associate a string with that key to our class above: `objc_setAssociatedObject(a, &key, "yooooooooooooo", .OBJC_ASSOCIATION_RETAIN)`. `.OBJC_ASSOCIATION_RETAIN` means retain a strong reference which is made atomically.

To retrieve (and print) our associated object we call: `print(objc_getAssociatedObject(a, &key) as? String)`, to print an string wrapped in an optional.

This is most useful when you want to associate an object with a UI element: A next focuable text field with a current one, for example.
