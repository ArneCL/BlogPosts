Title: Tomcat 7: Heap dump on Out Of Memory errors.
Tags: java|java-tomcat|java-memory
date: May 1, 2013

In your /usr/share/tomcat7/bin/catalina.sh file, add this to JAVA_OPTS file. For example:

		JAVA_OPTS='-XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/path/to/dir'

Your JAVA_OPTS could most likely contain other options. But these will make a core dump when tomcat runs out of memory. And dump it to that location (make sure that is writable by your application / server).

If you, for example, create a servlet with this code it will cause a heap dump:

	ArrayList<String> a = new ArrayList<String>();
	while(true) {
		a.add("asdfasdjf;lasdkjfl;SJF;LAJFDL;ASJDFL;ASJDFL;AJSDFL;JSLFJSDL;FJS;LFJA;LSDKJ;ksdjflsjdf;lasjdlfkj");
	}

Run it and you will see this in catalina.out:

		java.lang.OutOfMemoryError: Java heap space
		Dumping heap to /path/to/dir/java_pid32394.hprof ...
		Heap dump file created [334354454 bytes in 2.124 secs]
		Exception in thread "http-bio-8080-exec-250" java.lang.OutOfMemoryError: Java heap space
			at java.util.Arrays.copyOf(Arrays.java:2760)
			at java.util.Arrays.copyOf(Arrays.java:2734)

You can then take that hprof file and run it in a memory analyser, like Eclipse MAT or jhat. 

If the dump is particularly large, you'll have to ensure the program parsing it has enough memory. In the case of jhat, you pass it a parameter to do so:

		jhat -J-mx1000m /path/to/java_pid32394.hprof
