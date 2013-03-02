Title: Maven p4: Unit tests
Date: 2012-2-24 17:23:20
Tags: maven maven-unit-tests

If you added the unit test dependency in the last tutorial, you can now add a HelloTest.java file in src/test/java. 

We'll use the aforementioned Hello.java file to test:

		import junit.framework.Test;
		import junit.framework.TestCase;
	  	import junit.framework.TestSuite;
	  
	  	public class HelloTest 
	  	extends TestCase
	  	{
	  		/**
	  		 * Create the test case
	  		 *
	  		 * @param testName name of the test case
	  		 */
	  		public HelloTest( String testName )
	  		{
	  			super( testName );
	  		}
	  
	  		/**
	  		 * @return the suite of tests being tested
	  		 */
	  		public static Test suite()
	  		{
	  			return new TestSuite( HelloTest.class );
	  		}
	  
	  		/**
	  		 * Rigourous Test :-)
	  		 */
	  		public void testApp()
	  		{
	  			Hello h = new Hello();
	  			assertTrue( h.testMethod()!=43 );
	  
	  		}
	  
	  		public void testApp1()
	  		{
	  			Hello h = new Hello();
	  			assertTrue( h.testMethod()!=43 );
	  		}
	  	}

Now when you run mvn test or mvn install, you'll see your unit tests.

If you want to ignore tests or continue the build even with test failures, you need to give the surefire plugin configuration values:

		<plugin>
			<groupId>org.apache.maven.plugins</groupId>
			<artifactId>maven-surefire-plugin</artifactId>
			<configuration>
				<testFailureIgnore>true</testFailureIgnore>
				<skip>true</skip>
			</configuration>
		</plugin>
