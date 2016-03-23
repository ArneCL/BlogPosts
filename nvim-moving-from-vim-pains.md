title: Nvim: Pains while moving from vim
tags: nvim

I'll probably use `nvim` now since we can remotely control it with python or what have you.

However, there are annoyances in moving over (I'm on 0.1.3).

0. By default, the ruler isn't there. You don't automatically get the current line number.
0. By default, if you attempt to use your mouse to copy some text, it'll modify nvim's visual mode. I just want to paste some text to the X clibboard buffer (there are probably better way but meh).
0. By default, there's an annoying white statusline at the bottom of the page.
0. By default, `set list` doesn't show the eol character.

You can avoid all this by putting this in yout `.config/nvim/init.vim` file:

    set ruler
    set laststatus=0
    set mouse=v
    set listchars=tab:-\ ,trail:-,nbsp:+,eol:$

In addition, in gnu screen or tmux, the escape key is harder to press. You can put `maptimeout 10` in your .screenrc to fix in this gnu screen. It's something to do with nvim using a new library for user input, I believe.

Anyway, we're on 0.1.3, so thing will change.
