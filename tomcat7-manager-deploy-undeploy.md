Title: Tomcat 7: Deploying from the command line with Tomcat Manager
Tags: java,tomcat-manager,unix,unix-wget

You can deploy a WAR from the command line with wget:

		wget --http-user=tomcat --http-password=tomcat "http://localhost:8080/manager/text/deploy?war=file:/some/path/SomeWar.war&path=/SomeWar" -O -

You're entering your manager username and password, along with the path for the deployed war. "-O -" means output to STDOUT. The war part is pointing to the war file on the filesystem.

You can undeploy a war similarly.

		wget --http-user=tomcat --http-password=tomcat "http://localhost:8080/manager/text/undeploy?path=/SomeWar" -O -

This assume you've setup your tomcat manager username and password, and given yourself access to the manager-script group in the tomcat-users.xml file, i.e:

		<user username="tomcat" password="tomcat" roles="manager-gui,admin-gui,manager-script"/>
