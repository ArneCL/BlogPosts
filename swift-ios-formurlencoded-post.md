title: Swift 3 and iOS: Send a Form URL encoded POST
tags: swift,ios

Let's create a URLRequest, set its method, and then specify it to be a urlencoded.

    var r  = URLRequest(url: URL(string: u)!)
    r.httpMethod = "POST"
    r.setValue("application/x-www-form-urlencoded", forHTTPHeaderField: "Content-Type")
    let d = "somekey=someval&another=another".data(using:String.Encoding.ascii, allowLossyConversion: false)
    r.httpBody = d

After we do that, we use the `data` method of the string to encode it as `Data`, and set the requests body as such. From that point we can use the request.

We'll use the URLSession's `dataTask` to create a task from all that.

    let task = URLSession.shared.dataTask(with: r) { data, response, error in
      ...
    }

Finall we call `task.resume()`.
