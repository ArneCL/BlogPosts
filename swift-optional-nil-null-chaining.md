title: Swift 3: Optional, nil and null and chanining
tags: swift,swift-optional

You can wrap a normal variable, like a string etc, in an optional by adding an question mark to the type: `var s:String? = "hi"`.

Even if you, or something else, sets this to `nil` (there is no `null` in swift) then your program won't crash when you access `s`.

You can check this is `nil` or not via `if s == nil { ... }`. Note, `s` is stil is an Optional. To unpack it, to access the string, use `s!`.

To automatically unpack it in an if loop, use `let`: `if let u = s { print(u) } `. And we only go in the if body if `s` is not nil.

Probably the best thing about this is Optional chanining. Assume we have a class `athing` with a method `thing`:

    var opt:athing?
    opt = nil
    opt?.thing()

In this case, swift checks if `opt` is nil, finds it is, and then doesn't bother calling `thing`.
