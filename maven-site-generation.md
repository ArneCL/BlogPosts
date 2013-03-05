title: Maven p15: Site generation
date: 2012-3-14 23:50:03
tags: maven

In 3.0, you can get maven to produce various reports for you, from SCM, to mailing lists to unit tests. The report plugin has itself plugins to perform all kinds of reports.

First add a plugin within the build tag of your project. We'll deal with the stuff in configuration after.

		<build>
		<plugins>
		    <plugin>
			<groupId>org.apache.maven.plugins</groupId>
			<artifactId>maven-site-plugin</artifactId>
			<version>3.0-beta-3</version>
					<configuration>
					...
					</configuration>
				</plugin>
				...
			</plugins>
			...
		</build>
	
So we're adding a plugin as usual. Now for the configuration part. 

The first thing in configuration is reportPlugins, which we need to actually do anything. 

	    <configuration>
			<reportPlugins>
			<plugin>
			...
			</plugin>
			...
		</reportPlugins>
	    </configuration>
    
So let's look at the plugins we can define.

	   <plugin>
	      <groupId>org.apache.maven.plugins</groupId>
	      <artifactId>maven-project-info-reports-plugin</artifactId>
	      <version>2.2</version>
	      <reports>
		<report>cim</report>
		<report>issue-tracking</report>
		<report>dependencies</report>
		<report>index</report>
		<report>help</report>
		<report>scm</report>
		<report>summary</report>
		<report>mailing-list</report>
	      </reports>
	    </plugin>

This specifies reports for issue-tracking, scm etc. Obviously you need to configure these, so they'll be blank at the moment.

The next two configure javadoc and unit test reports.

	    <plugin>
	      <groupId>org.apache.maven.plugins</groupId>
	      <artifactId>maven-javadoc-plugin</artifactId>
	      <version>2.7</version>
	    </plugin>
	    <plugin>
	      <groupId>org.apache.maven.plugins</groupId>
	      <artifactId>maven-surefire-report-plugin</artifactId>
	      <version>2.12</version>
	    </plugin>
