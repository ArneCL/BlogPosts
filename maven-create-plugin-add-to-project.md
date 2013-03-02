title: Maven p8: Plugins p3
date: 2012-02-25 17:16:18
tags: maven,maven-plugins

Now we've got a plugin, we'll add it to a project.

I've simply created a new directory with this pom.xml. It says it's creating a jar. But the jar's empty. This is just to see the plugin in action. 

There are a few new things, to be noted afterwards.

	  	<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
			xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
				<modelVersion>4.0.0</modelVersion>
				<groupId>org.denevell.mavenplugins</groupId>
				<artifactId>another_test</artifactId>
				<packaging>jar</packaging>
				<version>1.0-SNAPSHOT</version>
				<name>another_test</name>
				<build>
					<plugins>
						<plugin>
							<groupId>org.denevell.mavenplugins</groupId>
							<artifactId>some_plugin</artifactId>
							<version>1.0-SNAPSHOT</version>
							<configuration>
								<message>HALLO</message>
							</configuration>
							<executions>
								<execution>
									<phase>compile</phase>
									<goals>
										<goal>test</goal>
									</goals>
								</execution>
							</executions>
						</plugin>
					</plugins>
				</build>
			</project>

The build tag has a plugin tag. Within we give it the group and artifact of the previously defined plugin, plus the version. The configuration is to pass the our.message parameter. We leave out the first part, for some reason. If we were setting this in the properties tag, under the project tag, we'd use our.message.

The execution tag says run the defined 'test' goal in the compile stage. And if we run mvn install, we'll see our output, 'HALLO' in this case, on the screen. 
