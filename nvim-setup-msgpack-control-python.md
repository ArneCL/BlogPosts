title: Nvim: Setup and basic msgpack control via python
tags: nvim

The best thing about `nvim` is the ability to control it remotely.

Apparently, this'll mean applications and embed nvim as an editor and send it commands and receive the resulting text etc.

Let's first install `nvim`.

    add-apt-repository ppa:neovim-ppa/unstable
    apt-get update
    apt-get install neovim

It uses--for perfectly good reasons I'm sure--XDG the .config directory for its configuration. So move your .vimrc file to `~.config/neovim/init.vim` Or don't if you're only messing around: hello.

*A useless aside: I really have no idea why we're using `.config` these days. Aren't all the directories prefixed with `.` for configuration? Anyway--as with all of life's great challenges--I guess I'll acclimatise.*

Right, so now we've got vim up and running. We need to find the socket we need to connect to it. So run this in normal mode and copy the result. It'll likely be a file in `/tmp/`.

    echo $NVIM_LISTEN_ADDRESS

Now we've got that address let's control neovim from python. Let's install python, pip3 and the neovim python module:

    apt-get install python3-pip
    pip3 install neovim

Now we've got python3 (python2 works as well I hear, but let's live on the bleeding edge), we can attach to the instance and send a command to nvim.

>>> from neovim import attach
>>> nvim = attach('socket', path='WHATEVER THE ABOVE SOCKET NAME WAS')
>>> nvim.command('echo "yalright there eh"')

And, below, neovim is bidding our every command. REJOICE.
