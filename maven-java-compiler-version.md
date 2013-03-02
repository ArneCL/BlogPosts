Title: Maven p5: Change the Java compiler version
Date: 2012-02-25 15:17:56
Tags: maven

For some bizarre reason Maven uses the 1.1 version of Java. You can change it by putting this within the project tab:

        <build>
        	<plugins>
      			<plugin>
      				<groupId>org.apache.maven.plugins</groupId>
      				<artifactId>maven-compiler-plugin</artifactId>
      				<version>2.0.2</version>
      				<configuration>
      					<source>1.5</source>
      					<target>1.5</target>
      				</configuration>
      			</plugin>
      		</plugins>
      	</build>

It's telling the maven compiler plugin to use the 1.5 version of the compiler.
