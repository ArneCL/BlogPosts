title: Glassfish setup
date: 2012-04-07 18:30:13
tags: java glassfish glassfish-setup

First download Java EE from http://www.oracle.com/technetwork/java/javaee/downloads/index.html and install that as a normal user. Keep the default settings throughout. 

This will install glassfish and you can go to http://localhost:8080/ to see glassfinsh once that's finished. You can stop and start the server via

    asadmin stop-server domain1
    asadmin start-server --verbose

(A domain is one or more server instances managed by an administrative server. And domain1 was the default name given to your domain.)

The admin panel is located as http://localhost:4848/ If you go to the applications panel you'll see where the installed applications are, or will be, at least. You can all see this via

    asadmin list-applications
