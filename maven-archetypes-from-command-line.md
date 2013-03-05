title: Maven p14: Command line archetypes
date: 2012-3-14 23:13:34
tags: maven

Instead of making a maven project manually, as in part 1, you can use the mvn command line to create something automatically.

		mvn archetype:create -DgroupId=org.denevell.maventest -DartifactId=simple -DpackageName=org.denevell.maventest

The archetype:create is a 'goal'. That is, it's saying create a simple java project. You can have many different types of goals, android, war etc, etc.

		-DgroupId=org.denevell.maventest

Is the group name that this project will have within maven. When you want to call this project as a depedency, you need to use that.

		-DartifactId=simple

This is the name of the project, and subsequently the folder name.

		-DpackageName=org.denevell.maventest

This is the class name that will be given to the sample java project maven will create.

Now maven has created you a pom file, a source code directory and a test directory.
