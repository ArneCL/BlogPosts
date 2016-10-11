title: Swift 3: Closures basics
tags: swift,swift-closures

Closures are inline functions that closes over (or traps) variables.  They have slightly funny `in` syntax in Swift 3.

Let's define a function, `a`, that has a first argument, `b`, as a String, and a second argument, `c`, as a function, or closure. `c` is a function that takes in a String and returns nothing:

    func a(b: String, c:(String)->(Void)) {
        c("hi")
    }

It calls the passed in closure with the passed in string plus an exclamation mark!

We can call it via: 

    a(b: "Yuumhhm", c: { s in
        print(s)
    })

The closure or function starts with a `{` and the name of variable that is an argument to this function, `s`. After that we state `in` to begin the body of the function. We we had multiple arguments they'd be `s, another`, for example.

There's some more magical syntax. You can have the `a` function call as `a(b: "Yuumhhm")`, i.e. stop it after the `b` parameter. And then add in the closure afterwards:

    a(b: "Uhhm") {
        s in
            print(s)
    }

Crazy.
