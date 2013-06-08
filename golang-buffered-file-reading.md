Title: Golang: Buffered file reading
Tags: golang, golang-io

You can open a file using the 'os' package:

	file, err := os.Open("/your/file/here")
	
You can also use the standard input, for example:

	file := os.Stdin

If you want to read a line from either, you need the buffered reader from the package 'bufio':

	bufferedReader := bufio.NewReader(file)

Now you can use the ReadString method, with a delimiter as the argument, to read a string from such:

	str := bufferedReader.ReadString('\n')

This will give us a line from the file, including the delimiter we specified.
