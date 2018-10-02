title: Javascript: Parsing and tokenising a markup language with regular expressions
tags: javascript

Previously we did some tokenising and parsing for a simple markup lanuage (https://newfivefour.com/javascript-parsing-tokenising-a-simple-markup-language.html).

But the problem was the token were delimited by spaces, therefore `_this could not be used_`.

We can get around this problem by doing more complex tokenisation. And we can use regexs for this.

So for `hello _i am a token_ and *i am listening to james brown* and /get up/` we will split the tokens based on if they are delimited by `_`, `*`, `/`.

Building the regex
===

We need to know how regexs work, but let's look at `\*.*\*` brefiely:

0. This match a `*` (we must prefix it with `\`)
0. ...then any character (represented by `.`)
0. ..multiple times (respresented by a *)
0. until we get a `*` (again, prefixed with `\`)

Therefore `"hello *i am james* again".match(/\*.*\*/g)` gives us `["*i am james*"]`

But we have a problem since `"hello *bold1* and *bold2*".match(/\*.*\*/g)` gives us `["*bold1* and *bold2*"]`.

This is because we "greedily" match the biggest `* ... *` we can. We can tell the regex not be greedy with `*?` instead of just `*`. So `"hello *bold1* and *bold2*".match(/\*.*?\*/g)` gives us `["*bold1*", "*bold2*"]`

We can also match `_this_` and `/this/` by using an`or` separator (represented by `|`) in the regex.

The other two regexs we'll use for those are: `_.*?_` and `\/.*?\/` (the `/` must be prefixed with a `\`).

So `"hello *i am james* again /italic/ and _underlined_ yes".match(/\*.*\*|_.*?_|\/.*?\//g)` gives us `["*i am james*", "/italic/", "_underlined_"]`.

But we're still missing out all the text that's not italic, bold or underlined. We can grab this by saying "start with a character that's not *, / or _ and continue looking at such a thing until you find a character that is *, / or _. 

In regex land we use `[^b]` to say match anything that's not `b`. So our regex will look like this: `[^*_/][^*_/]*[^*_/]`. Notice we're not using `?`. This is because we now want to match as many of these as we can.

Our regex looks like this: `"hello *i am james* again /italic/ and _underlined_ yes".match(/\*.*\*|_.*?_|\/.*?\/|[^*_/][^*_/]*[^*_/]/g)` which gives us `["hello ", "*i am james*", " again ", "/italic/", " and ", "_underlined_", " yes"]`.

Our final problem is that this doesn't work across multiple lines `hello *i am\nbold* yeah` will not work. That's because `.` in regex world doesn't work over multiple lines. We can make it do that by replacing it with a `dotall` operator: `[\s\S]`.

Our regex is now huge and unmaintainable. So let's split each match into array element, and pass that into the `Regex` object:

```
var dot = "[\s\S]"
var tokens = [`_${dot}*?_`, 
              `\*${dot}*?\*`, 
              `\/${dot}*?\/`, 
              `[^*_/][^*_/]*[^*_/]`]
"hello *i am james* again /italic/ and _underlined_ yes".match(new RegExp(tokens.join("|"), "g"))
```

But we have an extra problem with string interpretation since we're no longer using `/reg_ex_here/`. The `\` won't be shown. And we need it. So we need to put an extra `\` in front of it. But this will make our regex even uglier. There's a better solution though. Things in `[...]` don't need to be quoted, so we can use:

```

var dot = "[\\s\\S]"
var tokens = [`_${dot}*?_`, 
              `[*]${dot}*?[*]`, 
              `[/]${dot}*?[/]`, 
              `[^*_/][^*_/]*[^*_/]`]
"hello *i am james* again /italic/ and _underlined_ yes".match(new RegExp(tokens.join("|"), "g"))
```

Plugging the regex into our function
===

One difference between the last version is that we're no longer dealing with spaces and newlines at the start of the function. We replace a `\n` and a double space at the end of the function with the string replace function.

The code for the full function is:

```
function quickText(txt) {
  var replaceSpaceAndNL = t => t.replace(/  /g, "&nbsp;").replace(/\n/g, ' <br> ')
  var dot = "[\\s\\S]"
  var tokens = [`_${dot}*?_`, 
                `[*]${dot}*?[*]`, 
                `[/]${dot}*?[/]`, 
                `[^*_/][^*_/]*[^*_/]`]
  return txt.match(new RegExp(tokens.join("|"), "g"))
    .map(t => {
      if(t.startsWith("/")) return ["italic", t.slice(1, -1)]
      else if (t.startsWith("_")) return ["underline", t.slice(1, -1)]
      else if (t.startsWith("*")) return ["bold", t.slice(1, -1)]
      else return ["normal", t]
    })
    .map(token => {
      if(token[0] == "italic") return `<i>${replaceSpaceAndNL(token[1])}</i>`
      else if (token[0] == "underline") return `<u>${replaceSpaceAndNL(token[1])}</u>`
      else if (token[0] == "bold") return `<b>${replaceSpaceAndNL(token[1])}</b>`
      else return replaceSpaceAndNL(token[1])
    })
    .join("")
}
```

You can play with the result here: https://codepen.io/newfivefour/pen/vVNjjV

It doesn't deal with `_hello *there* again_`. But that can come in a later post.
