title: Apache Derby: Network server
tags: derby,derby-server

Instead of using Derby as an embedded server you can run it as a network server that multiple clients can connect to.

This is especially useful since with the embedded server you can run ij as the same time as another application is connected to the database.

You can run it using a derbyrun.jar file included with derby:

		java -jar /path/to/derby/lib/derbyrun.jar server start

You can shut it down with:

		java -jar /path/to/derby/lib/derbyrun.jar server shutdown

Once you start it, the databases will live in the location where you started derby. 

And you can connect to it to create a database via:

		ij> connect 'jdbc:derby://localhost:1527/somedb;create=true';

By default, the server listens on port 1527.
