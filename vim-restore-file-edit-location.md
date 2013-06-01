title: Vim: Keep location in file after exit
tags: vim

You can exit vim and then load a file at the same location you were previously at.

Put this in your .vimrc file.

		au BufWinLeave * mkview
		au BufWinEnter * silent loadview

Your views will be placed at .vim/views.

This actually restores your entire editing session.
