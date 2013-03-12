title: Gradle: Running a jar file
tags: gradle, gradle-jar, gradle-java, gradle-javaexec

You can get Gradle to run a jar file for you by modifying 'javaexec':

    javaexec { main='-jar'; args jar.archivePath }

This says the main class is '-jar' and we're passing our jar archive as the argument. It's the same as running 'java -jar YourArchive.jar'.

You an add this onto the end of the jaring process:

    task runJar(dependsOn:jar) << {
      javaexec { main="-jar"; args jar.archivePath } 
    }

'gradle runJar' will now run the jar task and then run the jar afterwards.

