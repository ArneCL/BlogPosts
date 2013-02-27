Title: Count the files in a directory
Tags: unix

    ls -1 | wc -l

That lists the files (-1 doesn't include the TOTAL line) and pipes the output for word count, that with the -l parameter counts of lines.

This includes sub directories, however. This:

    find . -maxdepath 1 -t f | wc -l

doesn't (only searches files in a maximum folder depth of one), but it does include hidden files, however.
