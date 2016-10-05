title: Swift 3: Class extensions
tags: swift

You can, instead of adding a method to a class, extend a class with an extension. The difference is that with an extension you don't have to have modifiable access to the class itself.

Given a class like `class athing {}` or any class, you can extend it via wrapping a new instance method, for example, in `extension athing {}`, with `athing` being the class name:

    extension athing {
        func yup(_ a:String) -> String {
            return a+"!!"
        }
    }
    ...
    athing().yup("sup")

This doesn't seem massively useful, except when you realise you can extend `UIViewController` to have a default implementation of `textFieldShouldReturn`, for example.
