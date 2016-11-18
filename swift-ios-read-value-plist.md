title: Swift 3 and iOS: Read a value from a plist
tags: swift,ios

Create a `Something.plist` file in your main project. Add a String value with the key `SomethingYeah` in it.

Then, from your main bunle, get a path for the resource `Something` with the type `plist`.

Then get a dictionary from that path. And then use that to get the value we inserted above.

    if let path = Bundle.main.path(forResource: "Something", ofType: "plist") {
        let dictRoot = NSDictionary(contentsOfFile: path)
        if let dict = dictRoot {
            debugPrint(dict["SomethingYeah"] as! String)
        }
    }
