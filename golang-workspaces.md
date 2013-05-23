Title: Golang: Workspaces
Tags: golang,golang-workspaces

Instead of using 'go run yourgolang.go' you should use to 'go' program with workspaces.

Workspaces allow you to organise your code, including its dependencies, including the automatic pulling of dependencies.

You need a GOPATH environmental variable that sets your workspace for your current project. 

The layout of a workspace is like so:

		bin/
			abinary
		pkg/
			linux_amd64/
					the/namespace/
							library.a
		src/
			the/namespace/
					golangfiles.go
			the/other/namespace/
					othergolangfiles.go


Go into src in your workspace, and create your own namespace (github.com/yourname/yourpackage/ for example).

Then you can create a golang file, in the package main, with a main() function. This will then become a golang 'command':

		package main

		import "fmt"

		func main() {
			fmt.Printf("Hello, world.\n")
		}

To make this binrary, issue (with the correct path obviously):

		go install github.com/yourname/yourpackge
		# 'go install' in the directory where your go files are located will also work

This will then put the binary in your bin/ directory, with whatever you named your golang file.

You can run this file as a normal binary.
