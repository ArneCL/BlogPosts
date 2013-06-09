Title: Golang: Command line arguments and environmental variables
Tags: golang, golang-os

You can access the first command line arguments with

	os.Args[1]

The command line argument at position 0 is the full name of the program.

You can access the base name, the last part, of it using the 'path/filepath' package:

	baseName := filepath.Base(os.Args[0])

You can access environmental variables:

	a := os.Getenv("PATH")
	// Or return first item in the environmental vars
	firstItem := os.Environ()[0]

