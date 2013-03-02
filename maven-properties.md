Title: Maven p2: Some pom settings
Date: 2012-2-24 16:31:38
Tags: maven

There are various things you can put in your pom.xml. Here are some things relating to the build and injecting properties.

Within &lt;project&gt;, you can set the build name for the jar, or whatever, that's created.

    <build>
      <finalName>${project.groupId}-${foo}-${os.name}-${project.artifactId}</finalName>
    </build>

Note the project.groupId is relating to the various in the pom.xml file. os.name is relating to the java variable found via getProperties(). You can also use env.path to get the path variable in the environment.

The ${foo} relates to a custom variable. This can also be in settings.xml apparently. You define it within the project tag, too.

	  <properties>
	  	<foo>foood</foo>
	  </properties>
