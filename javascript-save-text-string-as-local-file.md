title: Javascript: Save text or string as a local file
tags: javascript

This isn't hard. You use HTML5's download attribute on an `a` link.

```
var a = document.createElement("a");
a.href="data:application/json;charset=utf-8,YOUR_TEXT_HERE"
a.download = "some.json"
document.body.appendChild(a)
a.click()
document.body.removeChild(a)
```

In this case I'm saving it as JSON. Your file turns up in the Downloads directory.

You can't seem to specify the location though, either in code or via a popup - likely due to security concerns.

