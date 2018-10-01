title: Javascript parsing and tokenising a new simple new language
tags: javascript

Making a new language, at least in UNIX, normally involves lex and yacc. But the concepts are universal and can be written in Javascript.

A simple version of this means breaking down text into symbols, through spaces, and applying meaning to those symbols.

Take for example:

```
I /can/ definitely *see* a _thing_ there.

  The end.
```

We can break this down by saying each token is delimited by a space, and then give meaning:

0. Normal text, i.e. `I `, ` down `, etc.
0. Italic text, i.e. `/can/`
0. Bold text, i.e. `*see*`
0. Underlined text i.e. `_thing_`
0. A newline
0. A space

And we can write a function that does the above steps and converts the tokens into very, very old HTML (i.e. `<i>` and `<b>`):

```
function quickText(txt) {
  var startsAndEnds = (txt, token) => txt.endsWith(token) && txt.startsWith(token)
  return txt.replace(/\n/g, ' \n ') // so when we break up by spaces we can see the newline
  .split(/ /)
  .map(t => {
    if(t == "\n") return ["newline", ""]
    if(t == "") return ["space", ""]
    else if(startsAndEnds(t, "/")) return ["italic", t.slice(1, -1)]
    else if (startsAndEnds(t, "_")) return ["underline", t.slice(1, -1)]
    else if (startsAndEnds(t, "*")) return ["bold", t.slice(1, -1)]
    else return ["normal", t]
  })
  .map(token => {
    if(token[0] == "space") return `&nbsp;`
    else if(token[0] == "newline") return `<br>`
    else if(token[0] == "italic") return `<i>${token[1]}</i>`
    else if (token[0] == "underline") return `<u>${token[1]}</u>`
    else if (token[0] == "bold") return `<b>${token[1]}</b>`
    else return token[1]
  })
  .join(" ")
}
```

You can now run:

```
document.body.innerHTML = quickText(`I /can/ definitely *see* a _thing_ there.

   The end!

Here's a newline: &bsol;n
And underlined text: &lowbar;stuff&lowbar;`)
```

And you will get 

```
I <i>can</i> definitely <b>see</b> a <u>thing</u> there. <br> <br> 
&nbsp; &nbsp; &nbsp; The end! <br>
Here's a newline: \n &nbsp; <br> 
And underlined: _stuff_
```

Of course, since we're splitting on a space, `_hello there_` won't work. But we can come to that in a later post.
