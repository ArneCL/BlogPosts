title: Using Gradle to build a WAR
tags: gradle-java,gradle-war,gradle

You can use the war plugin to package your WAR for you:

		apply plugin: 'war'
		 
		repositories {
		   mavenCentral()
		}

		dependencies {
			providedCompile	'org.apache.tomcat:tomcat-servlet-api:7.0.37'
			compile 'com.sun.jersey:jersey-bundle:1.17.1'
			compile 'com.sun.faces:jsf-api:2.1.19'
			compile 'com.sun.faces:jsf-impl:2.1.19'
			compile 'org.eclipse.persistence:javax.persistence:2.0.0'
		} 

We apply the war plugin, incldue the maven central repository, and include various jar files for J2EE. 

The 'providedCompile' line means don't include this jar in the WEB-INF/lib directory, since Tomcat7 will already have this. The rest will be placed in that directory.

You need to have a directory structure as below (although you can configure this):

		src/main/java/
		src/main/webapp/WEB-INF/
		src/main/resources/

The java files will be placed in WEB-INF/classes. The resources will be placed in the same directory. The webapp/WEB-INF directory will include web.xml and other such files.

Once you run 'gradle war' your war file will be in build/libs/whatever.war
