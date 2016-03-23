title: Nvim: Externally update a buffer keeping scroll position using msgpack and Python
tags: nvim

Let's say you want to see the changes in a buffer, changes made externally, without pressing anything in nvim, while keeping your scroll position.

You can use the msgpack api using Python to send a load of text to the buffer.

First here's the python code to attach to your running nvim instance, with the socket name you got from running `echo $NVIM_LISTEN_ADDRESS` in nvim:

    from neovim import attach; 
    nvim = attach("socket", path="YOUR ADDRESS HERE");

Now let's get the current line number--using the vim function `line`--for the top of the screen and where the cursor is:
    
    top=nvim.funcs.line("w0"); 
    current=nvim.funcs.line("."); 

Now let's delete the entire buffer, ending up in insert mode (`\033` means press escape):

    nvim.input("\033ggVGdi"); 

Finally let's return to the position we were in:

    nvim.input("\033"+str(top)+"gg"+str(current)+"gg");

But we still haven't inserted the text, which we would do before the previous line above.

Let's use the command line to `cat` a file, and send it to our python code via `xargs`:

    cat YOURFILE | xargs -d '\003' -I {} python3 -c \
    'from neovim import attach; nvim = attach("socket", path="YOUR ADDRESS HERE"); \
     current=nvim.funcs.line("."); \
     top=nvim.funcs.line("w0"); \ 
     nvim.input("\033ggVGdi"); \ 
     nvim.input("""{}"""); \
     nvim.input("\033"+str(top)+"gg"+str(current)+"gg");'

And voila. You obviously need some way to run the above command automatically, but putting it in a thread waiting for a file to change is fairly trivial.
