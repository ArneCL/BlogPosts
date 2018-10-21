title: Maven p23: Build profiles
date: 2012-3-29 23:59:03
tags: maven

Development and production version of a project often exist with different properties, SQL server params for example. 

Maven allows us to use build profiles. In such a profile we can override pretty much anything in the POM. In this case we're going to override the resource filter in a 'prod' profile.

		...

		<build>
			<resources>
			    <resource>
			      <directory>src/main/resources/</directory>
			      <filtering>true</filtering>
			    </resource>
			</resources>                    
			  <filters>
			    <filter>src/main/filters/development.properties</filter>
			  </filters>               
		</build>

		<profiles>

			<profile>
			  <id>prod</id>
			  <build>
			      <filters>
				<filter>src/main/filters/production.properties</filter>
			      </filters>    
			  </build>
			</profile>	

		</profile>

		...

We have a normal build section that specifies the resource directory and a filter. Then in a profile section we give it a name, and override the filters tag in the build section. Note we keep the other build properties previously defined.

So when we run mvn package we'll use the development.properties. If we run mvn package -P prod we'll get production.properties.

It's also possible to active a profile on certain conditions, such as the JDK version. See the activition tag. You can have a activeByDefault tag in a profile to get that used by default. You can also have a profile defined in your own settings.xml file under the settings tag. That way you can give a property to the build system, your db password for example.
