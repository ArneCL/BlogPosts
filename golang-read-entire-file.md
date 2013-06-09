Title: Golang: Read an entire file
Tags: golang, golang-io

You need to import the 'io/ioutil' package for this.

		fileBytes, err := ioutil.ReadFile("/path/to/your/file")

This will return a slice of bytes as the first return argument, not a string.

You can convert it easily: 

		fileAsString := string(fileBytes)
