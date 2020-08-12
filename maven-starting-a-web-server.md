title: Maven p19: Starting a Java webapp
date: 2012-3-24 23:55:03
tags: maven,java-jetty,java

You can create a simple java webapp with this, noting the archetypeArtifactId.

		mvn archetype:create -DgroupId=your.namespace -DartifactId=yourwebapp -DarchetypeArtifactId=maven-archetype-webapp

This is create very simple project, with the web descriptor in src/main/webapp/WEB-INF/web.xml. This is where you configure the app, but at the moment there's on the display-name in, which if ever used is only used in IDEs and such descriptively. The src/main/webapp/index.jsp is just some simple HTML, bigger apps it would have java commands delimited with &lt;% %&gt;.

To run this quickly, instead of setting up Tomcat or whatever, you can install the jetty plugin for maven, allowing you to start a small web server to see the webapp quickly. Put this in your pom.xml within the build tag:

		<plugins>
			<plugin>
				<groupId>org.mortbay.jetty</groupId>
				<artifactId>maven-jetty-plugin</artifactId>
				<version>6.1.26</version>
			</plugin>
		</plugins>

Now you can run mvn jetty:run and your webapp will be available at http://127.0.0.1:8080/yourwebapp/

Obviously this has not servlets or anything, so it's very basic!
