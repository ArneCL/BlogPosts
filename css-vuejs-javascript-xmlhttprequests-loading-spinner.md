title: Javascript: A loading spinner for XMLHTTPRequest
tags: css,javascript
date: May 31, 2017

Take this CSS which will show a loading spinner similar to iPhone's. It takes up the entire background, and has 0.5 transparency.

```
#cover {
  background: url("http://www.aveva.com/Images/ajax-loader.gif") no-repeat scroll center center rgba(255, 255, 255, 0.5);
  position: absolute;
  height: 100%;
  width: 100%;
}
```

Now place the html below your holding div `<div id="cover"></div>`.

I have a very simple reactive `observe`, `onNext` and `onError`. We turn it just before we send the request and turn it off when we receive something back.

```
observe: function(receiver) {
  var xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) receiver.onNext(xhttp.response)
    else if(this.readyState ==4 && this.status!=200) receiver.onError(xhttp.statusText)
  }
  xhttp.open("GET", "https://whatever", true)
  xhttp.send()
  // show the #cover element
},
onNext: function(pagination) {
  // hide the #cover element
  ...
},
onError: function(message) {
  // hide the #cover element
  ...
}
```

