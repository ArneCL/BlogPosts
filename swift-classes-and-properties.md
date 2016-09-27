title: Swift: Classes and properties
tags: swift

You define a class with `class somename {}`, and variables and constants are defined with `var` and `let`, and they can take `private`, `public`, `static` modifiers.

If you have a uninitialised variables, `var s:String`, you must have `init(s: String) { self.s = s }`. Normally you initialise with `let c = somename()` but in this case you do `somename(s:"hi")`. And you acces the properties with `c.s` for example.

If you prefix a variable with `lazy` then you can do `lazy var prop: String = { /* fetch it somehow */ }()` and you'll get that value back in future gets.

You can compute values, by putting `get` and `set(variable)` in a block prefixed with the type, `type { get {...} set(var) {...} }
`:

    class com {
        var yes = "yes"
        var y: [String] { // If you prefix this with `class` it will be static
            get {
                return [yes.lowercased(), yes.uppercased()]
            } set(t) {
                yes = t[0]
            }
        }
    }
    var comv = com()
    print(comv.y)
    comv.y = ["yeah?"]
    print(comv.y)

If you just have `return something` in the block, that works for a get only computed value. 

You can observe how values of set similarly, with `willSet` and `didSet` in a block after the declaration.

    class observed {
        var c: Int = 0 {
            willSet(nv) {
                print("Setting \(nv)")
            }
            didSet {
                print("Finished setting")
            }
        }
    }
    observed().c = 4
