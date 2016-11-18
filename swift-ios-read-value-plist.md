title: Swift 3 and iOS: Read a value from a plist
tags: swift,ios

Create a `Something.plist` file in your main project. Add a String value with the key `SomethingYeah` in it.

And then you can use this code to retrieve that data:

    var dictRoot: NSDictionary?
    if let path = Bundle.main.path(forResource: "Something", ofType: "plist") {
        dictRoot = NSDictionary(contentsOfFile: path)
        if let dict = dictRoot {
            debugPrint(dict["SomethingYeah"] as! String)
        }
    }
