title: Javascript: A simple and naive Virtual DOM implementation, part 1
tags: javascript,virtual-dom

First thing we'll do is make a Javascript representation of a DOM tree.

Let's say we have this DOM tree:

```
<html>
  <head>
  </head>
  <body>
    <div id="hi">
      hi there
    </div>
  </body>
</html>
```

Let's convert that into:

```
[{
  "type": "node",
  "name": "HTML",
  "children": [{
    "type": "node",
    "name": "HEAD"
  }, {
    "type": "node",
    "name": "BODY",
    "children": [{
      "type": "node",
      "name": "DIV",
      "attrs": [{
        "id": "hi"
      }],
      "children": [{
        "type": "text",
        "value": "hi there"
      }]
    }]
  }]
}]
```

Each object is either a normal node or text (there are others we could do like comments, but let's keep it simple). And each has a name, like `BODY` etc.

We also store the attributes for a node in a list of objects. And the children for a node are included.

Here's the function that does that:

```
function traverse(vd, ele) {
  var nu = {}
  vd.push(nu)
  if (ele.nodeType == 1) {
    nu.type = "node"
    nu.name = ele.nodeName
    nu.attrs = []
    for (var i = 0; i < ele.attributes.length; i++) {
      var attr = {}
      attr[ele.attributes[i].name] = ele.attributes[i].value;
      nu.attrs.push(attr)
    }
  } else if (ele.nodeType = 3) {
    nu.type = "text"
    nu.value = ele.nodeValue
  }
  for(var i = 0; i < ele.childNodes.length; i++) {
    traverse(vd, ele.childNodes[i])
  }
}; 
traverse(vd, document.documentElement); // vd is an empty array to be populated
```

Next we should compare two of theses representations. And we will. Hopefully we will...
