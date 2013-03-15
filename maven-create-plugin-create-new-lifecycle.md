title: Maven p12: Plugins p5: Creating your own lifecycle
date: 2012-02-26 11:31:03
tags: maven,maven-plugins

We can also define custom lifecycles, that are run via a mojo plugin. These are run in parallel to the current lifecycle.

Create src/main/resources/META-INF/maven/lifecycle.xml:

		<lifecycles>
			<lifecycle>
			<id>customlifecycle</id>
				<phases>
				    <phase>
					<id>compile</id>
					<executions>
					    <execution>
						<goals>
						    <goal>test</goal>
						    <goal>test</goal>                            
						</goals>                        
					    </execution>
					</executions>
				    </phase>
				</phases>
			</lifecycle>
		</lifecycles>

It creates a new lifecycle, with a name, and specifies the phases. Each phase is named compile, clean etc, but the executions therein can have multiple custom goals. In this case we're defining the 'test' goal we defined in a plugin previously to run twice on the compile phase.

To run this lifecycle, we need an empty plugin, that specifies this lifecycle, with its goals, must be run:

		package org.denevell.mavenplugins;
		
		import org.apache.maven.plugin.AbstractMojo;
		import org.apache.maven.plugin.MojoExecutionException;
		import org.apache.maven.plugin.MojoFailureException;
		
		/**
		 * @goal lifecycleloader 
		 * @execute lifecycle="customlifecycle" phase="compile"
		 */
		public class LifecycleloaderMojo extends AbstractMojo {
		
			public void execute() 
					throws MojoExecutionException, MojoFailureException {
			}
		
		}

It's saying in the @execute lifecycle='ourlifecycle' phase='compile' that we should run the ourlifecycle lifecycle, specificially the 'compile' phase. This then needs to be put in our components.xml file (which we looked at in the previous tutorial):

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
							<package>
								org.denevell.mavenplugins:some_plugin:lifecycleloader					
							</package>
						</phases>
					</configuration>
				</component>
			</components>
		</component-set>

So when we get to the compile phase of our package, that then loads the LifecycleLoaderMojo plugin, which in turn loads our ourlifecycle lifecycle in its compile phase, which runs two instances of our 'test' goal.  
