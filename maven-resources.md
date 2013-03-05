title: Maven p17: Resources
date: 2012-3-14 23:50:03
tags: maven,maven-resources

You can add resources in both main and test in your project. Add a text file in src/main/resources. Then you can access that via
	
		Reader ios = new InputStreamReader(getClass().getClassLoader().getResourceAsStream("file.txt"));		
		String s = IOUtils.toString(ios);
		System.out.println(s);
	
This is because the file.txt will be in target/classes/ now

In your test directory, you can put different resources there. A file in src/test/resources/ can be accessed via similar methods, but this time in the test java files.

You can also filter these resource files. That is, define a filter, which is a key value type file, which will be used to replace values in the resource file. Here's the default.properties in src/main/filters

		a.property=brilliant

Here's a test.xml in src/main/resources

		<some>${a.property}</some>

Now in our POM we need to define that the xml will be filtered

		...
		<build>
		<filters>
		  <filter>src/main/filters/default.properties</filter>
		</filters>    
		<resources>
		  <resource>
		    <directory>src/main/resources/</directory>
		    <filtering>true</filtering>
		  </resource>
		</resources>
		</build>
		...

If you mvn package this application the process-resources phase will be run, and you'll get this XML file in your target/classes/test.xml

		<some>brilliant</some>
