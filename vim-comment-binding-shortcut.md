title: Vim: Binding to comment out code
tags: vim

If you want a shortcut to quickly comment out some text, put this in your .vimrc

    " Quick comment binding
    map ^_ :s#^#//#<CR>
    map ;^_ :s#^//##<CR>

The ^_ is inserted by pressing the control then / on your keyboard.

When you press the ctl-/ key, that line, or selection, will be prefixed with //
When you press ctrl ; and /, the comment will be removed.

