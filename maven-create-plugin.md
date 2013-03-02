title: Maven p6: Plugins p1
date: 2012-02-25 15:44:05
tags: maven,maven-plugins

Doing any compilation that's custom, that's not provided for using other plugins, requires writing your own. First create a 'archetype' of a plugin; that is, create the template:

  	mvn archetype:create \
			-DgroupId=org.denevell.mavenplugins \
			-DartifactId=some_plugin \
			-DarchetypeGroupdId=org.apache.maven.archetypes \
			-DarchetypeArtifactId=maven-archetype-mojo

This will create that template, using the maven-plugin-api as a dependency.

Now you need to create a class that actually performs something on behalf of the plugin. Those things are called mojos. In the source directory, create this class. 

		package org.denevell.mavenplugins;
	
		import org.apache.maven.plugin.AbstractMojo;
		import org.apache.maven.plugin.MojoExecutionException;
		import org.apache.maven.plugin.MojoFailureException;
	
		/**
		 * @goal test
		 * @author yooou
		 *
		 */
		public class TestMojo extends AbstractMojo {
	
			@Override
			public void execute() 
				throws MojoExecutionException, MojoFailureException {
					getLog().info("hellooooo");
				}
	
		}

Note the @goal attribute. This is the name you will use to call this. The execute() method is called. And we're using getLog() to log something to the screen.

Now if you run 'mvn install', you can use this plugin. Let's use the command line at first:

		mvn org.denevell.mavenplugins:some_plugin:1.0-SNAPSHOT:test

It's of the form groupdId:artifactId:version:goal
