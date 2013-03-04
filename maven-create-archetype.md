title: Maven p13: Creating an archetype
date: 2012-03-13 23:50:02
tags: maven

An archetype in maven 3.0 is a shortcut for creating a certain directory structure, default files and pom. Android, for example, has its own archetype.

First create a project with this pom:

  		<?xml version="1.0" encoding="UTF-8"?>
		<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/
		2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 h
		ttp://maven.apache.org/xsd/maven-4.0.0.xsd">
		
		
		  <modelVersion>4.0.0</modelVersion>
		  <groupId>org.denevell.mavinplugins</groupId>
		  <artifactId>newarche</artifactId>
		  <version>1.0-SNAPSHOT</version>
		  <packaging>maven-archetype</packaging>
		
		  <build>
		    <extensions>
		      <extension>
		        <groupId>org.apache.maven.archetype</groupId>
		        <artifactId>archetype-packaging</artifactId>
		        <version>2.2</version>
		      </extension>
		    </extensions>
		    
		    <pluginManagement>
		      <plugins>
		        <plugin>
		          <artifactId>maven-archetype-plugin</artifactId>
		          <version>2.2</version>
		        </plugin>
		      </plugins>
		    </pluginManagement>
		  </build>
		</project>
	
We're creating a normal looking pom, but the packaging type is maven-archetype. The plugin grabs that type. And the extension make an artifact during the lifecycle. In this case for our archetype packaing.

Then in src/main/resources/META-INF/maven/archetype-metadata.xml you should talk about the layout of your archetype:

		<?xml version="1.0" encoding="UTF-8"?>
		<archetype-descriptor xsi:schemaLocation="http://maven.apache.org/plugins/maven-archetype-plugin/archetype-descriptor/1.0.0 http://maven.apache.org/xsd/archetype-descriptor-1.0.0.xsd" name="another_test"
		    xmlns="http://maven.apache.org/plugins/maven-archetype-plugin/archetype-descriptor/1.0.0"
		    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
		
		        <fileSets>
		                <fileSet filtered="true">
		                        <directory>src/main/testdir</directory>
		                        <includes>
		                                <include>**/*.txt</include>
		                        </includes>
		                </fileSet>
		        </fileSets>
		</archetype-descriptor>
	
It's saying there is a file, with a directory, which includes txt files. You can place an actual txt file in this directory, and it will appear when someone goes to create your archetype.

Now you need to mvn install that then run this command, from a non maven project directory to create a new project of your archetype:

		mvn archetype:generate \
		    -DarchetypeGroupId=org.denevell.mavenplugins       \
		    -DarchetypeArtifactId=newarche   \
		    -DarchetypeVersion=1.0-SNAPSHOT            \
		    -DgroupId=org.denevell.testyarchetype \
		    -DartifactId=ournewproj

So we're specifying the group of the archetype we just created, along with its artifact id, and the version. Then we're giving it our own group and artifact name.
