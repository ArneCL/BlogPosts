Title: Golang: Libraries
Tags: golang,golang-libraries

A library is golang program that's not in the main package with a main function.

		package mylib 

		import "fmt"

		func Myfunc() {
			fmt.Printf("Hello, world.\n")
		}

If you put that, call it thelib.go, in $GOPATH/src/github.com/you/yourlib/ and then run

		go install github.com/you/yourlib

Then you'll get a library in $GOPATH/pkg/YOUR_ARCH/github.com/you/yourlib/thelib.a

You can then reference that via

		import "github.com/you/yourlib/"

		...
		
		mylib.Myfunc()

Note the default name you reference the library name is the package name of the library, not the directory name necessarily.

Note: 

A library can have only one main package, mylib in this case. So any files not in that package must be in subdirectories of the /src folder.
