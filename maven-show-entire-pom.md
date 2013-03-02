title: Maven p9: The entire pom
date: 2012-02-25 17:20:29
tags: maven

The pom.xml you use has various defaults it inherits from the 'super pom'. It can be useful to see these if you want to reference them, from a plugin for example. You can see them all by issuing this:

        mvn help:effective-pom
