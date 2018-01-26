title: Javascript: Using XMLHTTPRequest
tags: javascript

Here's a utility method to simply make http requests. You use it like this:

```
http_request("http://your_url.com/service_url", {
  intermediate: x => {
    console.log("intermediate", x)
  },
  before: x => {
    console.log("before", x)
  },
  success: x => {
    console.log("success", x);
  },
  fail: x => {
    console.log("fail", x)
  }
})
```

You give it a url. The url must have CORs enabled (i.e. google.com won't work). In the options object next you can set the `method` and `async` value for the XMLHttpRequest.

The options object also takes callbacks. They're given the current state of the XMLHttpRequest object.

* `before` is issued just before the request is sent(). 
* `intermediate` is called when the XHR `readyState` changes and the request hasn't either failed or succeed. 
* And `fail` and `success` are called when you've think. A `304` response is a success.

Here's the code

```
function http_request(url, opt) {
  var xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function() {
    if (this.readyState == 4 && (this.status == 200 || this.status == 304)) {
      if(opt.success) opt.success(this)
    } else if(this.readyState == 4) {
      if(opt.fail) opt.fail(this)
    } else {
      if(opt.intermediate) opt.intermediate(this)
    }
  }
  xhr.open(opt.method || "GET", url, opt.async || true)
  if(opt.before) opt.before(xhr)
  xhr.send()
}
```
