Title: Maven p1
Date: 2012-2-24 16:13:34
Tags: maven

So, after one has installed maven, and put it in one's path, you can start by simply creating a new directory.

In that directory, you need a pom.xml.

  <project>
		<modelVersion>4.0.0</modelVersion>
		<groupId>a.group</groupId>
		<artifactId>test</artifactId>
		<version>1</version>
	</project>

Maven's default directory for java source code is src/main/java. Create that and put in a simple Hello.java

	public class Hello {
		public static void main(String[] args) {
			System.out.println("hiya");
		}
		public int testMethod() {
			return 42;
		}
	}

Then if you run 'mvn install' you'll build, test (if there were tests) and installed a jar file. To actually run this, call:

	java -cp target/test-1.jar Hello
