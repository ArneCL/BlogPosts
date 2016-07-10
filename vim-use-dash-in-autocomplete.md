title: Vim: Use dash in autocomplete
tags: vim, vim-autocomplete

If you start typing in vim, then press `ctl n`, vim will give you a list of autocomplete options.

In this list you can press `ctl n` and `ctl p` to navigate the list.

However, by default, vim won't show you any autocomplete options with a dash in them.

For instance, if you have the text `this-is-a-variable`. And you start typing `t`, and then press `ctl n`, it will only show you `this`, not `this-is-a-variable`.

To make the autocomplete list include items that have a dash in them, add to the `iskeyword` option:

    set iskeyword+=\-
