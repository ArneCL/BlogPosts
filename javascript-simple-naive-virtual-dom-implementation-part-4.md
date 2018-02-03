title: A simple and naive Virtual DOM implementation, part 4
tags: javascript,virtual-dom

In part 3, we found a problem with our comparison function:

If we insert a new DOM node above the existing ones the function won't know the child nodes have been reorganised.

We use our eyes to know this. We quickly look at the node and its children. Thne we know this isn't a new node, but it's an existing node in a new position.

The algorithm doesn't have eyes. But we can still allow it to look. We could use JSON.stringify() to compare the nodes in the two virtual dom javascript functions.

We could do this, but this would make our comparison function larger. And we could instead do the work in the function that creates our javascript representatino of the DOM.

We can use a "hash code" of the node attributes and its children. This would allow us to compare our nodes based on this value. Here's stackoverflow's recommended way of creating a hash code from a value:

```
String.prototype.hashCode = function() {
  var hash = 0, i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};
```

Let's alter our `traverse` function to use this on a aggregation of all the values of the node plus a JSON.stringify representation of the children:

```
function traverse(v, ele) {
    var nu = {}
    v.push(nu)
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
    nu.children = []
    for(var i = 0; i < ele.childNodes.length; i++) {
      traverse(nu.children, ele.childNodes[i])
    }
    nu.hashcode = ((""+nu.type+nu.name+JSON.stringify(nu.attrs)+nu.type+nu.value)+JSON.stringify(nu.children)).hashCode()
}; traverse(vd, document.documentElement); JSON.stringify(vd, null, 2);
```

The last line is the only one that has changed. It will output something like:

```
...
{
  "type": "node",
  "name": "DIV",
  "attrs": [{
    "id": "hi"
  }],
  "children": [{
    "type": "text",
    "value": "hi there",
    "children": [],
    "hashcode": 634735809
  }],
  "hashcode": 2015122423
}
...
```

We can then use the `hashcode`s so our comparison function can recognise identical nodes in different positions. 

And we will in the next part of this series.

