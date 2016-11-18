title: Swift 3 and iOS: Save a file
tags: swift,ios

Let's say you already have a `Data` object filled with PDF data, or whatever.

We first get the url for our documents directory (in our user's home domain). Then we append our filename to that.

Finally we write our data above to this new url atomically, marking it with try since it may throw an exception.

    var docURL = (FileManager.default.urls(for: .documentDirectory, in: .userDomainMask)).last
    docURL = docURL?.appendingPathComponent("sample1.pdf")
    try OURDATA.write(to: docURL!, options: .atomicWrite)

