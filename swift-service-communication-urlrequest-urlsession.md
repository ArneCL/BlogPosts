title: Swift 3: Server communication with URLRequest and URLSession
tags: swift,swift-urlrequest,ios

Server and service communication is done with `URLRequest` and `URLSession`. We'll just download a simple webpage.

Let's create a `URLRequest` with `let req = URLRequest(url: URL(string: "https://newfivefour.com/")!)`

Let's now use a `URLSession`. We could give a configuration, but we'll use the default. And then call a `dataTask` with our request.

        let d = URLSession.shared.dataTask(with: req) {
            data, response, error in
            if let e = error {
                print("error")
                print(e)
            }
            if let r = response {
                print("response")
                print(r)
            }
            if let d = data {
                print("data")
                print(String.init(data: d, encoding: String.Encoding.utf8))
            }
        }

The last parameter, which is via the funky closure syntax, is the callback that's called when it's all downloaded.

It's given optionals of `data`, `response` and `error`. We'll use the optional let syntax to test if the optionals are there or not.

All we're doing is printing the reponse, error and data if they're there. If data is there, we convert it to a string with `String.init`.

You start this all by doing `d.resume()`.
