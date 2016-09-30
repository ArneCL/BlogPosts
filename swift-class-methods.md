title: Swift 3: Class methods
tags: swift

A method in a class is defined as `func yo(hithere v: Int) -> String { return "hi " + String(v) }` Note the `-> String` after the variable declaration defines the return type. And you're prefixing the variable in the argument list with some random text.

You then call `yourclassintance.yo(hithere: 3)`. You'd normally change `hithere` with `with` or `by` to fit into with Swift convention, though. You can also define static methods if you prefix them with `class`, and within such a method `self` refers to the type of the class.



