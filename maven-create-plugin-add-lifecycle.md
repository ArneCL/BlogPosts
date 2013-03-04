title: Maven p11: Plugins p4: adding it to a lifecycle
date: 2012-02-26 11:30:13
tags: maven,maven-plugins

Lifecycles package types are the values inbetween the packaging tags underneath the main project tag. They're normally jar, or similar, and define what to do on each compile, clean, package, etc phase. We can define our own, and run one of our plugin classes on a particular phase.

In src/main/resources/META-INF/plexus/components.xml create

  	<component-set>
			<components>
				<component>
					<role>org.apache.maven.lifecycle.mapping.LifecycleMapping</role>
					<role-hint>ourlifecyclepackage</role-hint>
					<implementation>
						org.apache.maven.lifecycle.mapping.DefaultLifecycleMapping
					</implementation>
					<configuration>
						<phases>
							<compile>
								org.denevell.mavenplugins:some_plugin:test
							</compile>
						</phases>
					</configuration>
				</component>
			</components>
		</component-set>

It defines a component that is a lifecycle mapping, has the name ourlifecycle, is implemented using the DefaultLifecycle, and its configuration tag says it is overriding the compile phase with the plugin (defined groupdId:artifactId:goal) that we defined before. We can put multiple goals using commas.

Now if you mvn clean install this plugin we can use it elsewhere. Let's create a new project. It has nothing in it, except this pom.xml:

		<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
		  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
		  <modelVersion>4.0.0</modelVersion>
		  <groupId>org.denevell.mavenplugins</groupId>
		  <artifactId>another_test</artifactId>
		  <packaging>ourlifecyclepackage</packaging>
		  <version>1.0-SNAPSHOT</version>
		  <name>another_test</name>
		  <build>
			  <plugins>
			     <plugin>
				     <groupId>org.denevell.mavenplugins</groupId>
				     <artifactId>weblog_plugin</artifactId>
				     <extensions>true</extensions>
				     <version>1.0-SNAPSHOT</version>
				     <configuration>
					<message>HALLO</message>
				     </configuration>
			     </plugin>
			  </plugins>
		  </build>
		</project>

This is very similar to the last time we used our plugin in another pom. However, there's now no executions tag, as the plugin is executed as part for the compile cycle, as defined in our components.xml. And the extensions tag set to true allow us to use the lifecycle name, ourlifecyclepackage, in the packaging tag.

Now if you mvn clean package, you'll see the plugin is executed, displaying the configured HALLO text. Note, although we only defined a compile phase in our components.xml, we still get the defaults from the superpom, 'package' in this case. We only overrode the compile phase.
