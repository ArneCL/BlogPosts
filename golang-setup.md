Title: Golang: Setup
Tags: golang,golang-setup

Download golang binary from the website.

Extract the tar.gz to a directory in your unix filesystem.

Then setup config file, bashrc or whatever, to have these lines:

		export GOROOT=$HOME/go
		export PATH=$PATH:$GOROOT/bin

In this case, you've unpacked your golang binary directory to your home directory. 

Now source that config file and you'll have access to the 'go' binary.

Now test your installation with a lovely Hello, World program:

		package main

		import "fmt"

		func main() {
		    fmt.Printf("hello, world\n")
		}

This say that 

1. You're going to be in the 'main' package (the one that's executed by the compiler)
1. You're going to use the 'fmt' functions
1. You're going to use a fmt function, Printf, to print some text

Then you can run that, say you've called it hello.go, with:

		go run hello.go

And you'll see the output.
