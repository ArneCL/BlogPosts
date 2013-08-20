title: Enable synax colouring in Vim with Golang
tags: golang vim

Put this in your .vimrc

  filetype off
  filetype plugin indent off
  set runtimepath+=$GOROOT/misc/vim
  filetype plugin indent on
  syntax on

First turn off filetype and filetype plugin indent. This will force it to reload when we include something new in the runtime path apparently.

Then set the runtimepath to include the golang installation directory. The vim files are there.

Then turn the filetype plugin indent on and the synax on.
