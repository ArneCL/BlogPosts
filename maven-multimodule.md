title: Maven p21: Multi module projects
date: 2012-3-24 23:59:03
tags: maven

Multimodules projects are for when you've partitioned your project into sub projects, and you want to automate changing one, compiling it, and then going into the other project to compile it again to pull up the changes from the other sub-project.

You'd have two projects, for example, with prj two being depedent on prj one. So when you mvn install it from the parent project, it will compile and install prj one, then compile and install prj two.

First create a parent project, of the type pom, defining the two sub-modules (the order is unimportant, mvn will find out what to compile first):

		<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
		  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
		  <modelVersion>4.0.0</modelVersion>
		  <artifactId>java0</artifactId>
		  <packaging>pom</packaging>
		  <version>1-SNAPSHOT</version>
		  <groupId>your.pkg</groupId>
		 
		  <modules>
		    <module>java2</module>
		    <module>java1</module>
		  </modules>

		</project>

Now you'll a java1 directory within that project, with its own pom, defining its parent, and source code:

		<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
		  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
		  <modelVersion>4.0.0</modelVersion>
		  <parent>
		    <groupId>your.pkg</groupId>
		    <artifactId>java0</artifactId>
		    <version>1-SNAPSHOT</version>
		  </parent>
		  <artifactId>java1</artifactId>
		  <packaging>jar</packaging>

		</project>

java1/src/main/java/your/pkg/TextOutput.java:

		package your.pkg;


		public class TextOutput {
			public String getText() {               
				return "Some sample text";
			}
		}

Now for java2. It's very similar to the pom in java1, except its defining its dependency on java1.

(Note we're only telling it to make a java-with-dependencies to easy run the new jar file later; it's not a part of multimodule projects per se)

		<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
		  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
			  <modelVersion>4.0.0</modelVersion>
			  <parent>
			    <groupId>your.pkg</groupId>
			    <artifactId>java0</artifactId>
			    <version>1-SNAPSHOT</version>
			  </parent>

			  <artifactId>java2</artifactId>
			  <packaging>jar</packaging>

			  <dependencies>
				<dependency>
				    <groupId>your.pkg</groupId>
				    <artifactId>java1</artifactId>
				    <version>1-SNAPSHOT</version>
				</dependency>
			  </dependencies>

			  <build>
			     <plugins>
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
			     </plugins>
			</build>
		</project>	


java2/src/main/java/your/pkg/DisplayText.java:

		package your.pkg;

		import your.pkg.TextOutput;

		public class DisplayText {
			public static void main(String[] strings) {
				TextOutput ta = new TextOutput();
				System.out.println(ta.getText());
			}
		}

Now if you go into the parent project, you can run mvn install. Then finally a java -cp java2/target/java2-1-SNAPSHOT-jar-with-dependencies.jar your.pkg.DisplayText will output the result of DisplayText. 

(Note we used the jar-with-dependencies thing so java2's output would contain the java1 depedency)
