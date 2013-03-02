Title: Java: Read a file as a string using Scanner
Tags:  java|java-io

If you first open a Scanner using a file location wrapped in a FileReader, you can then issue hasNext() and nextLine() to read from that file:

	Scanner in = new Scanner(new FileReader("file.txt"));
	String s, str="";
	while(in.hasNext() && (s=in.nextLine())!=null) str+=s+"\n";
