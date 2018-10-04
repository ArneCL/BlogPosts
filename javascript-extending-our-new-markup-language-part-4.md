title: Javascript: Extending our new markup language part 4
tags: javascript

Previously ( https://newfivefour.com/javascript-extending-our-new-markup-languge-part-3.html ) we said there was two annoying things about our new markup language: the regular expressions are getting out of hand, and two we can't do `_hello *bold* hello_`. We'll deal with the latter now.

In our last example we did `<b>${replaceSpaceAndNL(token[1])}</b>` when we found some bold text. That means everything within that bold text went unprocessed. 

We can fix that easily by making our function recursive -- it will call itself on that text. So instead we will have: `<b>${quickText(token[1])}</b>`. We can use this recursive nature in all our if statements, for bold text, for italic, for list items, etc.

Eventually the text inside it will be normal text. And the normal text will be processed  with `replaceSpaceAndNL(token[1])`, that is the spaces and newlines will be processed into HTML spaces and newlines. 

But in the case of headings and bullet points we don't want the newlines to be processed. So instead we will pass our `quickText` function a boolean that says whether we should process newlines or not, and have the final map in our function look at that.

So our function will now look like this:

```
function quickText(txt, ignoreNewlines) {
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
      let retValue = ""
      if(notThisButThat(token[0], this.prev, "olistitem")) retValue += "</ol>"
      else if(notThisButThat(token[0], this.prev, "ulistitem")) retValue += "</ul>"
      if(notThisButThat(this.prev, token[0], "olistitem")) retValue += "<ol style='margin:0px'>"
      else if(notThisButThat(this.prev, token[0], "ulistitem")) retValue += "<ul style='margin:0px'>"      
      if(token[0] == "italic") retValue += `<i>${quickText(token[1])}</i>`
      else if (token[0] == "underline") retValue += `<u>${quickText(token[1])}</u>`
      else if (token[0] == "bold") retValue += `<b>${quickText(token[1])}</b>`
      else if (token[0] == "ulistitem") retValue += `<li>${quickText(token[1], true)}</li>`
      else if (token[0] == "olistitem") retValue += `<li>${quickText(token[1], true)}</li>`
      else if (token[0] == "heading1") retValue += `<h1>${quickText(token[1], true)}</h1>`
      else if (token[0] == "heading2") retValue += `<h2>${quickText(token[1], true)}</h2>`
      else if (token[0] == "pre") retValue += `<pre style="display: inline">${token[1]}</pre>`
      else if (token[0] == "link") retValue += `<a href="${token[1][1]}">${quickText(token[1][0])}</a>`
      else if(ignoreNewlines) retValue += token[1].replace(/  /g, "&nbsp;")
      else retValue += token[1].replace(/  /g, "&nbsp;").replace(/\n/g, '<br>')
      this.prev = token[0]
      return retValue
    }, { prev : ""})
    .join("")
}
```

You can play with it here: https://codepen.io/newfivefour/pen/XxdZEe

We still have the fairly unmaintainable regular expressions to remove. And we'll do that in a later post.
