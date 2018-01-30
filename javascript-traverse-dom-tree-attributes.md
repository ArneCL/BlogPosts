title: Javascript: Tranverse the DOM tree looking at attributes
tags: javascript

You can traverse the DOM tree, looking at every element node and every attribute, like this:

```
function traverse() {
  do {
      if(main.nodeType == 1) {
      console.log(main.nodeName)
      for(var i = 0; i < main.attributes.length; i++) {
        console.log(main.attributes[i])
      }
    }
    if(main.hasChildNodes()) traverse(main.firstChild)
    }
  while (main = main.nextSibling)
}
```
