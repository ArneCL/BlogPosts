title: Java: Testing a REST service with a clean database (using sqlite)
tags: java,REST,java-testing,jersey,sqlite,tomcat7

You can test REST responses like so with Jersey's client api.

		YourResponseObject result = service
			.path("somepath")
			.type(MediaType.APPLICATION_JSON)
			.put(YourResponseObject.class, yourInputObject);

		assertTrue(result.isSuccessful());

But your responses may depend on the state of your database. 

And since you're not running your tests from a WAR, or what have you, you have no direct access to populate its seed or delete it.

You can use a command in your Junit4 @Before annotated test method to delete it, or issue any command to manipulate the database.

		@Before
		public void setup() throws IOException, InterruptedException {
		    Process p = Runtime.getRuntime().exec("rm -f /var/lib/tomcat7/dbs/test.db");
		    p.waitFor();
		}

The above will delete the sqlite database before each test, and our persistence.xml has been test to recreate it. If you're not using sqlite, you can issue any command to wipe the test database.

If you are using sqlite, in order for you can issue the command above make sure you have the correct permissions. 

Add yourself to the tomcat7 user group and give yourself write access to the directory in which the databse file resides:

		sudo usermod -a -G tomcat7 <your username>
		sudo chgrp tomcat7 /var/lib/tomcat7/dbs/
		sudo chmod g+w /var/lib/tomcat7/dbs
		(now logout and in again to ensure you're added to the correct groups)
		(now attempt to run the above rm command)
