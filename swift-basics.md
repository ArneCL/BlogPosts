title: Swift: Basics
tags: swift

A constant is `let pi = 3.14` and a variable is with `var`. And if you want to convert a `int` to a `String`, then `String(45)` will do it. Type information isn't needed, but `let pi:Float =...` would work.

A list is created with `["a", "b", "c"]`, and a map is with `["a":"b"]`, and access is `l[0]` and `l["a"]` respectively. The type signature is `[String]` and `[String:String]` and an empty structure is `[String:String]()`. Or `[]` and `[:]` if type can be infered.

Happily, you can add such in strings via `"hello \(l["a"]) there"`

You can use `for` to loop through lists or maps like `for (k, v) in someMap {}`. Switch statements don't have `break`s and you can do logic: `switch somevar { case "a","b": ... case let x where x.hasSuffix("ah"):... }`.
