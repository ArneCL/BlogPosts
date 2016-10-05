title: Swift 3: Protocols and default implementations
tags: swift

A protocol is an interface in Java: a declaration of a blueprint for a class, not a definition. This one says the implementor should have a getter and setters for `hi` and a function `y`:

    protocol athing {
        var hi:String {get set}
        func y(_ b:String) -> String
    }

To implement the protocol, add its name after a `:` after the classes's name:

    class arealthing : athing {
        var hi: String = "hi" // This gives us a getter and setter

        func y(_ a:String) -> String {
            return a+"!!"
        }
    }

We can have a default implementation of `athing` with an extension:

    extension athing {
        func y(_ b:String) -> String {
            return "zzz"
        }
    }

We can now remove `y` from `arealthing` if we want since we already have an implementation. The same applies for `hi` if we do `var hi: String { get { return ...} set(s) {...} }` in the extension.
