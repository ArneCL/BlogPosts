title: Maven p10: Assemblies
date: 2012-02-26 05:50:02
tags: maven,maven-assembly

Assemblies are archives Maven produces, a zipped up source folder, an execuatble jar file, for just two examples, alongsize your default type. 

Here's how to create a bundle of the source tree. Under project, build, plugins, place this:

  	<plugin>
			<artifactId>maven-assembly-plugin</artifactId>
			<version>2.2-beta-2</version>
			<executions>
				<execution>
					<id>source-it-yeah</id>
					<phase>package</phase>
					<goals> 
						<goal>single</goal>
					</goals>
					<configuration>
						<descriptorRefs>
							<descriptorRef>
							src
							</descriptorRef>
						</descriptorRefs>
					</configuration>
				</execution>
			</executions>
		</plugin>

The plugin has the artifactId of the assembly plugin. The id is the name you're going to give it. It executes in the package phase. The goal is single, run once. The configguration tells it its running the 'src' version of the plugin. That is, package the source.

Now, if you run mvn package, you'll see the archives of the source tree in /target.

Another plugin type creates a executable-jar for you:

		<plugin>
		     <artifactId>maven-assembly-plugin</artifactId>
		     <version>2.2-beta-2</version>
		     <executions>
		        <execution>
		                <id>create-executable-jar</id>
		                <phase>package</phase>
		                <goals>
		                        <goal>single</goal>
		                </goals>
		                <configuration>
		                        <descriptorRefs>
		                                <descriptorRef>
		                                        jar-with-dependencies
		                                </descriptorRef>
		                        </descriptorRefs>
		                        <archive>
		                                <manifest>
		                                        <mainClass>Hello</mainClass>
		                                </manifest>
		                        </archive>
		                </configuration>
		        </execution>
		     </executions>
		</plugin>

The only differences, except for the id, are the descriptorRef saying create an executable jar, and the artchive configuration, stating the class to execute when it's run.
