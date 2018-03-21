title: Insert one file into the middle of another using Sed
tags: unix,sed

Let's say you have a file called `file1`. And let's also say you have a file called `file2`.

And within `file1` you have this text in the middle of your file: `Yusef Lateef`.

If you run this command, 

```
sed -e '/Yusef Lateef/r file2' file1
```

Then below `Yusef Lateef` in file1 you will find the content of `file2`.



