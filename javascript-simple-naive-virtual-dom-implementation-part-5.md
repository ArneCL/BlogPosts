title: A simple and naive Virtual DOM implementation, part 5
tags: javascript,virtual-dom

In the last part, we gave our javascript structure creator function to ability to give each node a hashcode.

We did this so the comparison function can compare a node's children, to rearrage them rather than obliterate them.

The first thing we'll do is get the hashcodes before we look at the node's children. `v` and `v1` equate to the two virtual dom trees we're comparing.

```
var v_hashes = v.children.map(c => c.hashcode )
var v1_hashes = v1.children.map(c => c.hashcode )
```

Next we'll make an array of the positions of the `v1` hashes and whether they exist in the `v` hashes using `indexOf()`.

Given the `v` hash array `[1111, 2222]` and the `v1` hash array `[3333, 1111, 2222]` we'll get `[-1, 0, 1]`.

`indexOf()` is telling us: the zeroth item in `v1` doesn't exist in `v` but the first is the zeroth element, and the second is the first element.

We're also grabbing `v1`'s hash in the returning array for later reference.

```
var positions = v1_hashes.map((h, i) => { return { v1_hash: h, pos_of_v1_in_v: v_hashes.indexOf(h)} } )
```

With this new structure we will loop over it. It will tell us if there's a new item in the `v1` virtual dom that's not in the `v` virtual dom, i.e. we find a -1 value.

```
positions.filter(p => p.pos_of_v1_in_v == -1).forEach((p, v1_pos) => {
  console.log("insert " + p.v1_hash + " into " + v1_pos + " at " + path)
  v.children.splice(v1_pos, 0, JSON.parse(JSON.stringify(v1.children[v1_pos])))
})
```

So we look for that -1, and then rearrange the original `v` array. This means, later, when we compare the two tree branches our compare function will see they're the same.

Of course, our compare function must output the fact -- here indicated initially as the `console.log` -- that the DOM manipulation function must actually do this rearragement of the DOM.

Although there is *much* more to do with this function, we can now fix our previous problem with the algorithm:

The `v` virtual DOM tree was:

```
[{
    "type": "node",
    "name": "DIV",
    "attrs": [],
    "children": [{
        "type": "node",
        "name": "P",
        "attrs": [],
        "children": [{
            "type": "text",
            "value": "original",
            "children": [],
            "hashcode": -68148979
        }],
        "hashcode": -1072170396
    }],
    "hashcode": -154850033
}]
```

And `v1` was:

```
[{
    "type": "node",
    "name": "DIV",
    "attrs": [],
    "children": [{
        "type": "node",
        "name": "P",
        "attrs": [],
        "children": [{
            "type": "text",
            "value": "new",
            "children": [],
            "hashcode": 1156737192
        }],
        "hashcode": -1348153726
    }, {
        "type": "node",
        "name": "P",
        "attrs": [],
        "children": [{
            "type": "text",
            "value": "original",
            "children": [],
            "hashcode": -68148979
        }],
        "hashcode": -1072170396
    }],
    "hashcode": 1511584547
}]
```

In other words, `v1` had a new `P` node (hashcode: -1348153726) above the old one.

And this function:

```
compare = function(v, v1, path) {
    console.log(v.name)
    if(v1.children.length > 0) {
      var v_hashes = v.children.map(c => c.hashcode )
      var v1_hashes = v1.children.map(c => c.hashcode )
      var positions = v1_hashes.map((h, i) => { return { v1_hash: h, pos_of_v1_in_v: v_hashes.indexOf(h) } } )
      positions.filter(p => p.pos_of_v1_in_v == -1).forEach((p, v1_pos) => {
        console.log("insert " + p.v1_hash + " into " + v1_pos + " at " + path)
        v.children.splice(v1_pos, 0, JSON.parse(JSON.stringify(v1.children[v1_pos])))
      })
      for(var i = 0; i < v.children.length; i++) {
        compare(v.children[i], v1.children[i], path + "" + i)
      }
    }
}; 
compare(JSON.parse(JSON.stringify(vd[0])), JSON.parse(JSON.stringify(vd1[0])), "")
```

Will output only.

```
insert -1348153726 into 0
```

Next up, we'll look at how we can remove nodes.
