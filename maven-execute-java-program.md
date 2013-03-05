title: Maven p18: Exec plugin
date: 2012-3-14 23:55:03
tags: maven,maven-exec

The exec plugin can help you run a java project without using the java-with-dependencies assembly. You run it from the command line.

Issue this:

		mvn exec:java -Dexec.mainClass=your.package.YourMain
