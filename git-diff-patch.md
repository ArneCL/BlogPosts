title: Git: Create a patch file via git diff
tags: git,git-diff,unix,unix-patch

If you run

    git diff > your.patch

The normal git diff output will be saved to a file.

If you take that and apply it to the directory with patch, you'll update your files.

    patch -p1 < your.patch

You need -p1 since in the diff output the file name are like

    a/your/directory/YourFile.java
    b/your/directory/YourFile.java

And you only need the 'your/directory/...' bit, so p1 says ignore everything up until after the first slash.

If you want to make backups, issue patch -p1 with the -b argument.
