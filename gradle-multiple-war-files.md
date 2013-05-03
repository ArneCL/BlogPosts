title: Gradle: Creating multiple WAR files
tags: gradle,gradle-war
date: 2013-03-29 11:53:00

If you want to create a different type of WAR, with different resource files in this case you can create a task that is of type War type.

    task createFunctionalWar(type: War, dependsOn: classes) {
        from('src/test/resources/META-INF'){ 
                into('WEB-INF/classes/META-INF') 
                include 'persistence.xml' 
        } 
        rootSpec.exclude 'META-INF/persistence.xml'
        classifier = 'Functional'
    }

In this task, we exclude a file from the WAR and replace it with one in our test directory. And we give it a 'Functional' classifier.

It will now reside in build/libs/ProjectName-Functional.war
