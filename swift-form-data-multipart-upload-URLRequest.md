title: Swift 3 and iOS: Form data and multipart uploads with URLRequest
tags: swift,ios,ios-urlrequest

If you want to upload an image to a server, an image from the photo gallery or camera for example, you often use a multipart request.

First create a POST Request as normal, with with a boundary string created via a UUID request and the content type as `multipart/form-data` with the boundary string. 

    var r  = URLRequest(url: URL(string: "https://prospero.uatproxy.cdlis.co.uk/prospero/DocumentUpload.ajax")!)
    r.httpMethod = "POST"
    let boundary = "Boundary-\(UUID().uuidString)"
    r.setValue("multipart/form-data; boundary=\(boundary)", forHTTPHeaderField: "Content-Type")

We must now create the http body. We use the below function, passing in parameters as a dictionary with strings, the boundary string we created, data from the UIImage, a mime-type and the filename for the image.

    r.httpBody = createBody(parameters: params,
                            boundary: boundary,
                            data: UIImageJPEGRepresentation(chosenImage, 0.7)!,
                            mimeType: "image/jpg",
                            filename: "hello.jpg")

The `createBody` method first loops over the parameters dictionary, adding them to the body as a `Content-Disposition` with the boundary.

Finally, it adds the image as data, with the filename, the mime-type and with the boundary as before.

    func createBody(parameters: [String: String],
                    boundary: String,
                    data: Data,
                    mimeType: String,
                    filename: String) -> Data {
        let body = NSMutableData()
        
        let boundaryPrefix = "--\(boundary)\r\n"
        
        for (key, value) in parameters {
            body.appendString(boundaryPrefix)
            body.appendString("Content-Disposition: form-data; name=\"\(key)\"\r\n\r\n")
            body.appendString("\(value)\r\n")
        }
        
        body.appendString(boundaryPrefix)
        body.appendString("Content-Disposition: form-data; name=\"file\"; filename=\"\(filename)\"\r\n")
        body.appendString("Content-Type: \(mimeType)\r\n\r\n")
        body.append(data)
        body.appendString("\r\n")
        body.appendString(boundaryPrefix)
        
        return body as Data
    }

The `appendString` doesn't exist on a `NSMutableData`. It's a helper extension as defined below:

    extension NSMutableData {
        func appendString(_ string: String) {
            let data = string.data(using: String.Encoding.utf8, allowLossyConversion: false)
            append(data!)
        }
    }

Now we have the `URLRequest` we can send it off as usual.
