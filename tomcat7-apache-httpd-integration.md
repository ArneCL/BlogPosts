Title: Tomcat 7: Apache HTTPd 2.2 integration with virtual-hosts
Tags: java-tomcat,apache,apache-mod_rewrite
date: May 3, 2013

First install and enable the mod_jk module for Apache

		apt-get install libapache2-mod-jk
		a2enmod jk

Then create a workers file. A worker is a process that will connect you to a tomcat instance. We're creating the workers.properties file at /etc/apache2/workers.properties.

		worker.list=worker1
		worker.worker1.type=ajp13
		worker.worker1.host=localhost
		worker.worker1.port=8009

We're giving it a name (will be used later), saying we're using the ajp13 connector to connect to tomcat 6 and above instances, saying it's on localhost and saying we're listening on port 8009 (we'll set tomcat listening on this port in a little while.)

Now in your apache.conf file, add:

		JkWorkersFile /etc/apache2/workers.properties
		JkShmFile /var/log/apache2/mod_jk.shm
		JkLogFile /var/log/apache2/mod_jk.log
		JkLogLevel info
		JkLogStampFormat "[%a %b %d %H:%M:%S %Y] "

Here we point to our workers file, setup some file locations to be next to each other and set some logging information.

Finally edit the /etc/tomcat7/server.xml to accept these ajp13 connections. Uncommend this line:

	    <Connector port="8009" protocol="AJP/1.3" redirectPort="8443" />

The only thing left is to setup your virual host file. Here's an example of a virtual host file you should have in /etc/apache2/sites-available/blar

		<VirtualHost *:80>
		  ...

		  JkMount / worker1
		  JkMount /* worker1

		  RewriteEngine on
		  RewriteRule ^/(.*)$ /YOUR_DEPLOYMENT_NAME/$1 [L,PT]

		  ...
		</VirtualHost>

Note we're pointing all the files that hit the root of our virual host to our worker via the JkMount command.

Generally, our tomcat servlets or jsp pages are prefixes with the name of the deployment file. Hello.war would be prefixed with Hello/. To get around this the RewriteRule gets around this by rewriting anything going to the root by transparently adding the deployment name.
