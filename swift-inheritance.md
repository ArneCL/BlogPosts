title: Swift 3: Inheritance
tags: swift

When you define a class, inheritet another using `name1 : name2`. You can call super class method with `self.method()`, and the same with properties.

You can override methods by prefixing their definition with `override` and the same goes for property setters, getters and observers. In the case of hte latter, both observers will be called.

If you don't want a method, setters, getter or observer to be overriden, prefix its definition with `final`. Yes, this is basically Java.
