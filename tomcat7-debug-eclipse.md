title: Tomcat 7: Debugging in Eclipse
tags: java-tomcat,java-tomcat-debug,java,eclipse
date: Apr 23, 2013

In your catalina.sh file (if you're using unix), you must place this at the top:

		export JAVA_OPTS="-Xdebug -Xrunjdwp:transport=dt_socket,address=8000,server=y,suspend=n"

Note the line may contain other options, but the above must be there nonetheless.

Now stop and start tomcat.

Then go into Debug Configurations in Eclipse and add a new Remove Java Application. Enter the following details:

		host: localhost
		post: 8000

You can now start this debug configuration. Your application will stop and eclipse will move to a breakpoint added in eclipse should you hit on.
