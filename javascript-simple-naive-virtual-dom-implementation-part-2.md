title: A simple and naive Virtual DOM implementation, part 2
tags: javascript, virtual-dom

We now have a javascript reprentation of our DOM. (See part 1).

But when we traverse this structure we want to know what parts relate to which part in the DOM.

Let's make a function that shows us where each javascript structure relates in the DOM tree: 

```
function show_dom_location(v, path) {
    console.log(v.type, v.name, path)
    for(var i = 0; i < v.children.length; i++) {
      show_dom_location(v.children[i], path + "" + i)
    }
}; compare(vd[0], "")
```

`vd` is your virtual dom javascript structure from part 1 of this series. We pass in `[0]` since we're starting at the root element of the structure.

And we pass in a blank string. This will hold the location of each node.

Each time we loop through a child element and recurse into the same function, we will add the loop iteration number. This seem strange but let's see the output:

```
node HTML 
node HEAD 0
node BODY 1
node DIV 10
text undefined 100
```

The first output is the HTML node and the blank string we passed in.

The second output is saying "I'm the zeroth node in HTML element, i.e. `HEAD`"

And last output is saying "I'm the first child (not zeroth) of the HTML element, i.e. `BODY`. And the zeroth of that, i.e. `DIV`. And the zeroth output of that, i.e. our text node.

Let's then use this `100` to find the text node in our dom:

```
document.documentElement.childNodes[1].childNodes[0].childNodes[0]
```

In part three we'll look at comparing two virtual dom javascript structures to find differences.
