title: Javascript: Removing the regular expression from our new markup language, part six
tags: javascript

Previously we decided the regular expression for our markup language were unmaintainable. And we wrote a function that replaced the regular expressions. ( https://newfivefour.com/javascript-removing-regex-from-new-markup-language.html )

But that function didn't deal with markup tags with different start and end points, `[hello there|https://url]` was our example.

We can remedy that by specifying the start and end tags for our markup. i.e.

```
tokens: [["*", "*"], 
         ["/", "/"], 
         ["_", "_"], 
         ["`", "`"],
         ["[", "]"]]
```

And in our helper function we'll ensure we look for the starting tag and look for the ending tag. This is the function that gets for the ending tag for a certain letter:

```
let endingTagFor = (letter, ob) => ob.tokens.filter(t => t[0] == letter)[0][1]
```

And here's the function that checks if we're found a starting tag:

```
let hasStartTag = (letter, ob) => ob.tokens.map(t => t[0]).indexOf(letter) != -1
```

Our entire function is now here:

```
function quickText(txt, ignoreNewlines) {
  let startTag          = (lett, pos, ob) => { ob.endtag = endingTagFor(lett, ob); ob.pos = pos }
  let endTag            = (ob) => ob.endtag = undefined
  let hasTagEnded       = (letter, ob) => ob.endtag && ob.endtag == letter
  let startOtherGrab    = (pos, ob) => { ob.isGrabbingOther = true; ob.pos = pos}
  let endOtherGrab      = (ob) => ob.endOther = false
  let isEndOfPrevTag    = (ob) => ob.endtag == undefined
  let hasStartTag       = (letter, ob) => ob.tokens.map(t => t[0]).indexOf(letter) != -1
  let endingTagFor      = (letter, ob) => ob.tokens.filter(t => t[0] == letter)[0][1]
  let endOfInput        = (txt, pos) => pos == txt.length -1
  let shouldStartNewTag = (ob) => isEndOfPrevTag(ob) && !ob.isGrabbingOther
  let hasOtherGrabEnded = (lett, ob) => ob.isGrabbingOther && hasStartTag(lett, ob)
  let tokens = []; strArray(txt).forEach(function(letter, pos) {
    if(hasOtherGrabEnded(letter, this)) {
      tokens.push(txt.substr(this.pos, pos - this.pos))
      this.isGrabbingOther = false
      startTag(letter, pos, this)
    } else if(hasTagEnded(letter, this) || endOfInput(txt, pos)) {
      tokens.push(txt.substr(this.pos, pos - this.pos + 1))
      endTag(this)
    } else if(shouldStartNewTag(this)) {
      if(hasStartTag(letter, this)) startTag(letter, pos, this)
      else startOtherGrab(pos, this)
    }
  }, { endtag: undefined, pos: -1, isGrabbingOther: false, 
      tokens: [["*", "*"], 
               ["/", "/"], 
               ["_", "_"], 
               ["`", "`"],
               ["[", "]"]],  })
  return tokens
}
```

And you can play with it here: https://codepen.io/newfivefour/pen/bmepZV

We still don't deal with multiple letter tags though, `##` for example, and we will next.

