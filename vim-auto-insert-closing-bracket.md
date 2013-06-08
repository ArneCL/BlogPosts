title: Vim: Auto-insert closing bracket while coding
tags: vim

You can automatically insert a closing bracket when typing in code.

You can turn a 

		for {<Then a quick enter key>

into:

		for {
			<Cursor now located here>
		}

You need a inoremap line in your .vimrc:

		inoremap {<CR>  {<CR>}<Esc>O

It says when you type a opening bracket, then quickly press enter, it will:

* insert a carriage return
* a closing bracket
* go into command mode and press 'O'

The final line means it will insert a new line on the line above.

If config also supports auto-indent, the newline will also indent properly.
