title: Maven p22: Run a task at a build lifecycle phase
date: 2012-3-29 23:01:03
tags: maven,ant

To execute a plugin, or an Ant task in this case, at a certain time in the build, you can specify a plugin in the build tag, and then an executions tag to specify the phase it should execute:

		  ...
		  <build>
		    <plugins>
		      <plugin>
			<artifactId>maven-antrun-plugin</artifactId>
			<executions>
			  <execution>
			    <id>hellothere</id>
			    <phase>pre-clean</phase>
			    <goals>
			      <goal>run</goal>
			    </goals>
			    <configuration>
			      <tasks name="hallo">
				<echo>Hello, World</echo>
			      </tasks>
			    </configuration>
			  </execution>
			</executions>
		      </plugin>
		    </plugins>
		  </build>
		  ...

This says that the ant plugin should be ran in the 'pre-clean' stage, that the goal in the ant plugin should be run, and the tasks in the configuration says what to do.
