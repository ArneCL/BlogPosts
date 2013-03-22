title: Gradle: Createing multiple WAR files
tags: gradle,gradle-war,tomcat

If you want to create a different type of WAR, with different resource files in this case you can create a task that is of type War type.

    task createFunctionalWar(type: War, dependsOn: classes) {
        sourceSets.main.resources.srcDirs = ['src/test/resources']
        classifier = 'Functional'
    }

In this task, we change the resources source test to come from our test directory. And we give it a 'Functional' classifier.

It will now reside in build/libs/ProjectName-Functional.war
