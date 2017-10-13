Title: Unix: Basics of Gawk
Tags: unix,awk

The basic syntax of this command is usually:

		gawk '<gawk command>' filename

Within the gawk command, the format is:

		BEGIN { <operations> } /<pattern match>/ { <operations> } /<another pattern>/ { <another op> } END { <operations> }

The BEGIN and END parts are optional. As is the pattern match.

Within the main operations block, you can use the NF variable to find many fields are on this line.

This gawk program will only print non-blank lines, since blank lines have a NF of 0:

		gawk '{ if(NF!=0) print $0 }' filename

The 'print $0' will print the whole line. The $1 will print the first field and so on. Fields are separated by spaces and/or tabs.

Pattern matching will allow you to only print lines with, in this case, the word 'hello' in them:

		gawk '/hello/ { print $0 }' filename

If you place a '~' before the pattern match, it will be inverted.

There are many other things gawk can do, including variables, addition of fields and many more.
