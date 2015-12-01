title: Vim: Syntax highlighting fix
tags: unix,vim

For some reason, in large files, syntax highlighting in vim breaks sometimes, with Javascript at least.

You can ensure the syntax highlighting starts from the beginning of the file, thereby not breaking, via:

    :syntax sync fromstart

Something you should probably put in .vimrc.
