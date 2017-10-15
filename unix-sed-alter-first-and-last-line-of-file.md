title: Using sed to alter the first and last line of a file
tags: sed,unix

Sed normally alters every line of a file. You can change this by either prepending the expression with a number or a dollar sign for the last line.

```
cat some_file | sed '1 s/^\(.\)/START OF FILE\1/' | sed '$ s/\(.\)$/\1END OF FILE/'
```

This takes the first character on the first line, and adds 'START OF FILE' before it.

The second command takes the last character on the last line, and adds 'END OF FILE' after it.
