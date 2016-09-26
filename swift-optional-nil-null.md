title: Swift: Optional, nil and null
tags: swift,swift-optional

You can wrap a normal variable, like a string etc, in an optional by adding an question mark to the type: `var s:String? = "hi"`.

Even if you, or something else, sets this to `nil` (there is no `null` in swift) then your program won't crash when you access `s`.

You can check this is `nil` or not via `if s == nil { ... }`. Note, `s` is stil is an optional. To unpack it, to access the string, use `s!`.

To automatically unpack it in an if loop, use `let`: `if let u = s { print(u) } `.
