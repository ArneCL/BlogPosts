title: Javascript: Removing the regular expression from our markup language, part 5
tags: javascript
date: Thu Oct 4 22:11:34 2018

Previously we made a markup language but noted the regular expressions were becoming unmaintainable ( https://newfivefour.com/javascript-extending-our-new-markup-language-part-4.html ).

We'll start making a function that parses our text into tokens. Our algorithm will go like this:

0. Start a new tag when `*, /, _,` etc is encountered
0. Continue until another `*, /, _,` etc tag is found
9. Then save all the text inside that, including the markers, in an array

And 

0. If a tag ends, and the next character is not a markup tag, grab the text anyway
0. Continue until a `*, /, _,` etc tag is found
0. Then save all the text in an array, and start a new markup tag as above

The code that is below:

```
var strArray = s => s.split("")
var str = `hihi *hello*/italic/ ss_u_pp *ag/a/in* some \`pre\` text`
document.body.innerHTML = str + "<br><br>" + quickText(str).join("<br>")

function quickText(txt, ignoreNewlines) {
  let startTag          = (letter, pos, ob) => { ob.endtag = letter; ob.pos = pos }
  let endTag            = (ob) => ob.endtag = undefined
  let hasTagEnded       = (letter, ob) => ob.endtag && ob.endtag == letter
  let startOtherGrab    = (pos, ob) => { ob.isGrabbingOther = true; ob.pos = pos}
  let endOtherGrab      = (ob) => ob.endOther = false
  let isEndOfPrevTag    = (ob) => ob.endtag == undefined
  let hasTagsInLetter   = (letter, ob) => ob.tokens.indexOf(letter) != -1
  let endOfInput        = (txt, pos) => pos == txt.length -1
  let shouldStartNewTag = (ob) => isEndOfPrevTag(ob) && !ob.isGrabbingOther
  let hasOtherGrabEnded = (lett, ob) => ob.isGrabbingOther && hasTagsInLetter(lett, ob)
  let tokens = []
  strArray(txt).forEach(function(letter, pos) {
    if(hasOtherGrabEnded(letter, this)) {
      tokens.push(txt.substr(this.pos, pos - this.pos))
      this.isGrabbingOther = false
      startTag(letter, pos, this)
    } else if(hasTagEnded(letter, this) || endOfInput(txt, pos)) {
      tokens.push(txt.substr(this.pos, pos - this.pos + 1))
      endTag(this)
    } else if(shouldStartNewTag(this)) {
      if(hasTagsInLetter(letter, this)) startTag(letter, pos, this)
      else startOtherGrab(pos, this)
    }
  }, { endtag: undefined, pos: -1, tokens: ["*", "/", "_", "`"], isGrabbingOther: false })
  return tokens
}
```

You can play with it here: https://codepen.io/newfivefour/pen/MPyqNa?editors=0011

Note this parsing section can be plugged into the other sections you saw in previous posts.

But this function only deals with single character markups, and doesn't deal with markers with different start and end points (`[` and `]`). And we're going to deal with those in later posts.

