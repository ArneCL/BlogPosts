title: Gradle: Production resource files
tags: gradle,java,gradle-resources

Unlike Gradle's Android plugin, there doesn't seem (as of 1.10) a great way to specify production, or any other type, of resources.

There may be a better way, but simply specifying an additional resources directory works.

For instance, say your directory structure is:

    src/main/java/...
    src/main/resources/...
    
Then when you compile, the files in src/main/resources/ will be copied to, in the case of WAR files, WEB-INF/classes/.

However, if you also have an additional directory

    src/prod/resources
    
And specify in your build.gradle file to include both the resources directory (in this case when -PPRODUCTION is passsed to Gradle, -P is for project variable)

    if(project.hasProperty('PRODUCTION')) {
            sourceSets.main.resources.srcDirs 'src/main/resources', 'src/prod/resources'
    }
    
Then gradle will place the resources in src/prod/resources in your, again in the case of WAR files, in WEB-INF/classes/, thereby overwriting the src/main/resources files.
