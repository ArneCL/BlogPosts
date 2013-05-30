Title: Golang: Deferring statements
Tags: golang

The defer keyword allows you to defer a statement executement until just before the function ends.

This will print the first print statement last and the last print statement first.

		defer fmt.Println("Last")
		fmt.Println("First")

This is most useful for deferring closing of files.

		aFile, err := os.Open("filename")
		if err !=nil {
			log.Fatal("Can't open file")	
		}
		defer aFile.Close()
		// More statements

In the above, you have ensure the file is closed by the time the function or method ends with the defer aFile.Close() statement.

If you exit with os.Exit() or log.Fatal, for example, the defer call will not be called, but the runtime will close any open files for you.
