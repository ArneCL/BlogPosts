title: Javascript: Extending our markup language parser, part seven
tags: javascript


This details the development of the package https://github.com/newfivefour/wildlife-analysis which is available on [[npm|https://www.npmjs.com/package/wildlife-analysis]].



Previously we refactored our markup parser to get rid of the regular expression and make it so the tags can have start and end tags ( https://newfivefour.com/javascript-extending-our-regex-less-markup-parser-part-six.html ).

But it still doesn't deal with `##`, since each marker is a single character. 

We were looking at a single character of the input string through `theText.split("").forEach(function(letter, pos) {`. We should refactor our code so it's in a `for` loop with an iterator. 

This means we won't automatically be looking at a letter, but a position, which we can alter by increasing the position if we want to look at more than one letter. And we can increase the iterator when we want to skip letters.

We were using the extra argument in the `forEach` loop to define `this` which was an object that contained the markup language marker last position, all the tokens we match etc. That will now be in a separate object, `parseState` which the loop will alter.

Here's the code now we've refactored out the `forEach` loop in favour of a `for` loop.

```
let parseState = { 
    endtag: undefined, pos: -1, isGrabbingOther: false, 
    tokens: [["*", "*"], 
             ["/", "/"], 
             ["_", "_"], 
             ["`", "`"],
             ["[", "]"]]}
  for(var pos = 0; pos < txt.length; pos++) {
    let letter = txt[pos];
    if(hasOtherGrabEnded(letter, parseState)) {
      tokens.push(txt.substr(parseState.pos, pos - parseState.pos))
      parseState.isGrabbingOther = false
      startTag(letter, pos, parseState)
    } else if(hasTagEnded(letter, parseState) || endOfInput(txt, pos)) {
      tokens.push(txt.substr(parseState.pos, pos - parseState.pos + 1))
      endTag(parseState)
    } else if(shouldStartNewTag(parseState)) {
      if(hasStartTag(letter, parseState)) startTag(letter, pos, parseState)
      else startOtherGrab(pos, parseState)
    }
  }
```

( You can play with it here: https://codepen.io/newfivefour/pen/OBXXdp )

We can also change the helper functions. They close over the `parseState` so there's no need to pass it in. And we can make them deal not with letters but with positions in a string. We'll have a look at some of the functions:

```
  let parseState = { 
    endtag: undefined, pos: -1, isGrabbingOther: false, 
    tokens: [["*", "*"], 
             ["/", "/"], 
             ["_", "_"],
             ["`", "`"],
             ["[", "]"]]}
  let startTokens       = parseState.tokens.map(t => t[0])
  let endTokens         = parseState.tokens.map(t => t[1])
  let getStartTagOrNull = (pos) => startTokens.filter(t => t == txt.substr(pos, t.length))[0]
  let getEndTagOrNull   = (pos) => endTokens.filter(t => t == txt.substr(pos, t.length))[0]
  let endingMarkFor     = (start) => parseState.tokens.filter(t => t[0] == start)[0][1]
```

This defines our parse state with the starting and ending tokens, creates an array with all the start markers, all the end markers, find a start marker at a position in the `txt` string (by looking at `txt` at the passed point until the length of the suspected marker), find a end marker at a position in the `txt` string, and returns an ending markers if you pass it a starting marker.

The remaining functions alter the state of `parseState` during the loop. 

Now we have these new functions that work, not on a lettter, but on a position in a string, our main logic changes a little in the last if else loop: we use `getStartTagOrNull` instead of passing in a letter. And we don't need the `letter` variable:

```
for(var pos = 0; pos < txt.length; pos++) {
  if(hasOtherGrabEnded(pos)) {
    tokens.push(txt.substr(parseState.pos, pos - parseState.pos))
    parseState.isGrabbingOther = false
    startTag(getStartTagOrNull(pos), pos)
  } else if(hasTagEnded(pos) || endOfInput(txt, pos)) {
    tokens.push(txt.substr(parseState.pos, pos - parseState.pos + 1))
    endTag()
  } else if(shouldStartNewTag()) {
    let knownTag = getStartTagOrNull(pos)
    if(knownTag) startTag(knownTag, pos)
    else startOtherGrab(pos)
  }
}
```

Here's the updated version: https://codepen.io/newfivefour/pen/YJWjwM

We're nearly done, but we can't just enter `["##", "##"]` into our list of tokens just yet. This is because we'll match an end marker, `##`, with the position at the first `#`, and then continue. This means we won't grab the entire ending marker.

Let's look at this code:

```
let extraEndTagMarkers = endMarkLengthMin1(pos)
tokens.push(txt.substr(parseState.pos, pos - parseState.pos + 1 + extraEndTagMarkers))
pos = pos + extraEndTagMarkers 
endTag(pos)
```

The first line gets the length of the end marker (minus 1), if if there's no ending mark returns 0.

Then we grab the text from position in parseState, adding on the extra ending marker if we need to.

Then we add that potential extra length on our loop iterator (so we skip the remainder of the tag in the loop)

Then end the tag as usual.

Here's the final example which deals with markers with multiple characters, `#` and `##` in our case: https://codepen.io/newfivefour/pen/GYqXyv

It also deals with our bullet points `* a point` and `. a point`. 

But there's a slight problem with that if we match until the end of the line, i.e. `["\n* ", "\n"]`. It will grab the `\n` as part of the tag, and if the next line requires a `\n` at the start of it, which `["\n* ", "\n"]` does, then it will not see it. In this case we need a newline between `* points`. (We'll see a way around this later)

Next we'll look at integrating our new parser into the old `quickText` function.
