title: A simple and naive Virtual DOM implementation, part 3
tags: javascript, virtual-dom

You'll recall from part 1 we have a javascript structure, `vd`, like this:

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

Let's say we have another, `vd1`, which is the same except the text value is `hi there again`.

We want a function which loops through all the children, finds this difference and tells us. And that is simple enough:

```
function compare(v, v1, path) {
    if(v.type != v1.type) console.log(path, "type", v1.type)
    if(v.name != v1.name) console.log(path, "name", v1.name)
    if(JSON.stringify(v.attrs) != JSON.stringify(v1.attrs)) console.log(path, "attrs", v1.attrs)
    if(v.value != v1.value) console.log(path, "value", v1.value)
    for(var i = 0; i < v.children.length; i++) {
      compare(v.children[i], v1.children[i], path + "" + i)
    }
}; compare(vd[0], vd1[0], "")
```

It will output:

```
100 value hi there again
```

Telling us that at node one, zero, zero we should change the value attribute to "hi there again".

For our first iteration of this function, this isn't overly bad. (Although we really need to do better with the `attrs` part but we'll leave it for now).

But what happens if we don't just change values, but we insert a new node, a `P` with some text, above the first div? 

In other words:

```
<html>
  <head>
  </head>
  <body>
    <p>
      a new insert
    </p>
    <div id="hi">
      hi there
    </div>
  </body>
</html>
```

It will output this:

```
10 name P
10 [{"id":"hi"}] [] attrs []
100 value a new insert
```

It's replacing the first `DIV` for a `P`, with new attributes. And replacing the existing text node.

But we didn't want it replaced. We wanted a new node inserted above it. We will have to think of a new implementation to overcome this problem.

And in part 4, we will.
