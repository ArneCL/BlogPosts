title: A simple markdown blog using three lines of bash
tags: unix,bash

Imagine you've got a load of markdown files such as `post1.md` etc. 

And that you have a command, `markdown`, that converts markdown to html. (This exists: look it up).

This will convert all your markdown files to HTML and put them in a directory called `tmp` which you will have to create.

```
for i in `ls *.md`; do    markdown $i > tmp/`basename $i .md`.html; done
```

Now this next command will surround all your new HTML files with a `<div class='entry'>` tag and output the whole lot into `entries.html`.

```
ls tmp/* | xargs -n 1 awk 'BEGIN {print "<div class=\"entry\">" } {print $0} END {print "</div>"}' > entries.html
```

Finally create a `template.html` file with the lines `<!-- insert here -->` somewhere in the middle.

Then this final command will insert everything in `entries.html` into your `template.html` file and output the result into a new file, `index.html`

```
sed -e '/<!-- insert here/r entries.html' template.html > index.html
```
