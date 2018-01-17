title: Vim: Change the colour of the folded line
tags: vim

You can fold/collapse lines in vim. Let's say you do it manually, do `:set foldmethod=manual`.

Then highlight the lines you want to fold. Then press `zf`. You can open and close folds with `za`.

But the line vim gives you is an ugly light grey colour. You can change this to black via `:hi Folded ctermbg=black`.

I'm using `cterm` since I'm using the text console. Otherwise I'd use guiterm
