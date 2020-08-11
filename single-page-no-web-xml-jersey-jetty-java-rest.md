title: A single page Java/Jetty/Jersey REST app with no web.xml descriptor
tags: java-jetty, java-jersey, gradle, java
date: Mar 12, 2015

First create the build.gradle file in your directory:

    apply plugin: 'war'
    apply plugin: 'eclipse'
    
    repositories {
       mavenCentral()
    }
    
    dependencies {
        compile 'org.glassfish.jersey.media:jersey-media-json-jackson:2.16'
        compile 'org.glassfish.jersey.bundles:jaxrs-ri:2.16'
    }
    
    compileJava {
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }
    
Then, in `src/main/java/com/example`, create App.java:

    package com.example;
    
    import java.util.ArrayList;
    import java.util.List;
    
    import javax.ws.rs.ApplicationPath;
    import javax.ws.rs.GET;
    import javax.ws.rs.Path;
    import javax.ws.rs.Produces;
    import javax.ws.rs.core.MediaType;
    
    import org.glassfish.jersey.server.ResourceConfig;
    
    @ApplicationPath("rest") 
    public class App extends ResourceConfig {
      public App() { packages("com.example"); }
    
      @Path("example")
      public static class Hello {
        
          @GET
          @Produces(MediaType.APPLICATION_JSON)
          public List<String> example() {
            List<String> l = new ArrayList<>();
            l.add("one"); l.add("two");
            return l; 
          }
    
      }  
      
    }

Now 

0. Create the war file with gradle 
0. Download the Jetty runner jar
0. Run the war file with the jetty runner (takes about 15 seconds to init usually)
0. Use curl to test the app
 
From the command line:

    gradle build war
    wget http://central.maven.org/maven2/org/eclipse/jetty/jetty-runner/9.3.0.M1/jetty-runner-9.3.0.M1.jar
    java -jar jetty-runner-9.3.0.M1.jar --port 8081 build/libs/your-directory-name.war
    curl localhost:8081/rest/example && echo
        
The above curl command should print:

    ["one","two"]
