title: Javascript: Extending our new markup language, part 3
tags: javascript

Although our new markup language ( https://newfivefour.com/javascript-tokenising-parsing-new-markup-language-part-2.html ) doesn't deal with `_hello *there* again_` yet,  let's extend it with headings, links, formatted code and lists beforehand.

Our markup language uses `*`, `_` and `/` to format the text. This means we can't use those characters lest they will be interpreted. But there is a way: we'll mark anything between &#96; as not to be interpreted.

Our regex for that will be `[`&#96;`][\\s\\S]*?[`&#96;`]` and we'll add the &#96; to our regexes for non-markup language so it doesn't mean the &#96; marks as normal text: `([^*_/.`&#96;`][^*_/.`&#96;`]*[^*_/.`&#96;`])`. Our function now looks like this:

```
document.body.innerHTML = quickText(`I /can almost/ definitely *visually see* a _thingy thing_ there.

   The end!

*Or is
it?*

\`special characters */_\`

`)

function quickText(txt) {
  var replaceSpaceAndNL = t => t.replace(/  /g, "&nbsp;").replace(/\n/g, ' <br> ')
  var dot = "[\\s\\S]"
  var tokens = [`_${dot}*?_`, 
                "[`][\\s\\S]*?[`]",
                `[*]${dot}*?[*]`, 
                `[/]${dot}*?[/]`, 
                "[^*_/`][^*_/`]*[^*_/`]"]
  return txt.match(new RegExp(tokens.join("|"), "g"))
    .map(t => {
      console.log(t)
      if(t.startsWith("/")) return ["italic", t.slice(1, -1)]
      else if (t.startsWith("_")) return ["underline", t.slice(1, -1)]
      else if (t.startsWith("*")) return ["bold", t.slice(1, -1)]
      else if (t.startsWith("`")) return ["pre", t.slice(1, -1)]
      else return ["normal", t]
    })
    .map(token => {
      if(token[0] == "italic") return `<i>${replaceSpaceAndNL(token[1])}</i>`
      else if (token[0] == "underline") return `<u>${replaceSpaceAndNL(token[1])}</u>`
      else if (token[0] == "bold") return `<b>${replaceSpaceAndNL(token[1])}</b>`
      else if (token[0] == "pre") return `<pre style="display: inline">${token[1]}</pre>`
      else return replaceSpaceAndNL(token[1])
    })
    .join("")
}
```

(note: that still means we can't use a &#96; in our text without writing `&#96;`.)

We'll next add links. They will be represented like this `[link text|https://linkurl.com]`. The regex for that will be `\\[${dot}*?\\]`. We'll add the `[` and `]` symbols to our normal characters regex so those characters aren't eaten up as normal text. We'll split on the `|` character and display them in a `<a>`.

Next we'll add headings. They'll be represented by `#a heading` and `##a smaller heading` and will last until the end of the line. The regexs will be `##.*?\\n` and `#[^#].*?\\n`. The `\\n` says match until the end of the line. the `#[^#]` is so `#` and `##` can be differentiated. Again, we'll add the `#` to our normal text regex so that `#` is eaten up as normal text.

Finally we'll add ordered and unordered bullet points. The regexs for these are easy. We'll do a `* ` for unordered and `. ` for ordered.: `^[*] .*\\n` and `^[\\^] .*\\n`. (^ at the start of a reg ex means match the start of the line, and so our regex parameters will need to include "m" to give us multiline and therefore match the start of a line.)Again, we'll add these symbols to our regex for normal characters so they're not eaten up as normal characters. 

Our final part of the functions is now more complex. We're saving what the previous token was (via an extra parameter to the map function) and if it was not previously a ordered list, but now is then add `<ol>` to the output, and if it now not a ordered list, but was previously, add a `<\ol>`.

Our full function now looks like this:

```
function quickText(txt) {
  var replaceSpaceAndNL = t => t.replace(/  /g, "&nbsp;").replace(/\n/g, '<br>')
  var replaceSpace = t => t.replace(/  /g, "&nbsp;")
  var notThisButThat = (dis, that, name) => dis != name && that == name
  var dot = "[\\s\\S]"
  var tokens = ["[^*_/\\^`\\[\\]#][^*_/\\^`\\[\\]#]*[^*_/\\^`\\[\\]#]", 
                `_${dot}*?_`,
                `[*][^ ]${dot}*?[*]`,
                `##.*?\\n`,`#[^#].*?\\n`,
                `[/]${dot}*?[/]`,
                `\\[${dot}*?\\]`,
                `^[*] .*\\n`,
                `^[\\^] .*\\n`,
                "[`][\\s\\S]*?[`]"]
  return txt.match(new RegExp(tokens.join("|"), "gm"))
    .map(t => {
      if(t.startsWith("/")) return ["italic", t.slice(1, -1)]
      else if (t.startsWith("_")) return ["underline", t.slice(1, -1)]
      else if (t.startsWith("* ")) return ["ulistitem", t.slice(1)]
      else if (t.startsWith("^ ")) return ["olistitem", t.slice(1)]
      else if (t.startsWith("##")) return ["heading2", t.slice(2)]
      else if (t.startsWith("#")) return ["heading1", t.slice(1)]
      else if (t.startsWith("*")) return ["bold", t.slice(1, -1)]
      else if (t.startsWith("`")) return ["pre", t.slice(1, -1)]
      else if (t.startsWith("[")) return ["link", t.slice(1, -1).split("|")]
      else return ["normal", t]
    })
    .map(function(token) {
      console.log(token)
      let retValue = ""
      if(notThisButThat(token[0], this.prev, "olistitem")) retValue += "</ol>"
      else if(notThisButThat(token[0], this.prev, "ulistitem")) retValue += "</ul>"
      if(notThisButThat(this.prev, token[0], "olistitem")) retValue += "<ol style='margin:0px'>"
      else if(notThisButThat(this.prev, token[0], "ulistitem")) retValue += "<ul style='margin:0px'>"      
      if(token[0] == "italic") retValue += `<i>${replaceSpaceAndNL(token[1])}</i>`
      else if (token[0] == "underline") retValue += `<u>${replaceSpaceAndNL(token[1])}</u>`
      else if (token[0] == "bold") retValue += `<b>${replaceSpaceAndNL(token[1])}</b>`
      else if (token[0] == "ulistitem") retValue += `<li>${replaceSpace(token[1])}</li>`
      else if (token[0] == "olistitem") retValue += `<li>${replaceSpace(token[1])}</li>`
      else if (token[0] == "heading1") retValue += `<h1>${replaceSpaceAndNL(token[1])}</h1>`
      else if (token[0] == "heading2") retValue += `<h2>${replaceSpaceAndNL(token[1])}</h2>`
      else if (token[0] == "pre") retValue += `<pre style="display: inline">${token[1]}</pre>`
      else if (token[0] == "link") retValue += `<a href="${token[1][1]}">${token[1][0]}</a>`
      else retValue += replaceSpaceAndNL(token[1])
      this.prev = token[0]
      return retValue
    }, { prev : ""})
    .join("")
}
```

It works, as you can see here ( https://codepen.io/newfivefour/pen/ReWEvE ), but the we have a few problems:

* The regexs are getting unmaintainable. 
* We can't deal with `_hello *there* again_`

The first problem will be fixed when we removed regular expressions.

We'll deal with the last issue next.
