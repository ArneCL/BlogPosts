title: Gradle: Running tests
tags: gradle,gradle-tests

Gradle will automatically run tests in

    src/test/java/

(Although this can be configured.)

If you have junit 4 tests, you simply need to annotate the methods with @Test, and Gradle will run them.

You'll get a nice report in 

    build/reports/tests/index.html

If you run 'gradle build' or 'gradle test' you'll see the tests running.

If you need dependencies for these tests that shouldn't appear in the final build, you can use the testCompile source set:

    dependencies {
      testCompile 'junit:junit:4.11'
    	testCompile 'org.mockito:mockito-all:1.9.5'
    	testCompile 'com.sun.jersey:jersey-bundle:1.17.1'
    	testCompile 'org.codehaus.jackson:jackson-core-asl:1.9.12'
    }
