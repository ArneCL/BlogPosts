title: Maven p16: Assembly, java-with-dependencies
date: 2012-3-14 23:50:03
tags: maven,maven-assembly

The standard jar created will not include any dependencies included, as a quick way around this you can create a jar with dependencies. This is all the byte code included in the same jar, ergo it will be large.

In the build then plugins tag:

		<plugin>
			<artifactId>maven-assembly-plugin</artifactId>
			<configuration>
				<descriptorRefs>
					<descriptorRef>
						jar-with-dependencies
					</descriptorRef>
				</descriptorRefs>
			</configuration>			
		</plugin>
	
We're using the assembly plugin, and configuring it to create a description jar-with-dependencies.

This won't be created automatically. We'll have to run mvn install assembly:assembly to create a jar in target/itsname-jar-with-dependencies.jar

To ensure it is created automatically, change its configuration to tell it to run on execution by specifying a executions -> execution, with the phase and the configuration within that.

		<plugin>
			<artifactId>maven-assembly-plugin</artifactId>
			<executions>
				<execution>
					<id>itsname</id>
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
					</configuration>
				</execution>
			</executions>
		</plugin>
