title: Maven p3: Depedencies
date: 2012-2-24 16:59:08
tags: maven

You can tell maven that your project depends on project x, like a unit testing library. 

These dependencies seem to reside in .m2/repository. You get a few default ones, like junit. Others can be downloaded, oftentimes automatically.

You need to tell you pom.xml if your project depends on them:

    <dependency>
  		<groupId>junit</groupId>
  		<artifactId>junit</artifactId>
  		<version>3.8.1</version>
  		<scope>test</scope>
  	</dependency>

The groupId is the directory .m2/repository. artifactId is the final directory. Then the version number comes after that.

Other scope can either be compile, provided (meaning the jdk or whatever provides it), runtime (meaning not needed to compile, but needed at runtime) and system (which means locate it in the system).

An optional tag can be added, as well.
