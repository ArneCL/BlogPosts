title: A one page Java/Jetty/Jersey REST app with no web.xml descriptor

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
    
Then create the directory structure for gradle:

    mkdir -p src/main/java/com/example
    
Then, in that directory, App.java:

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
        
          public Hello() {}
    
          @GET
          @Produces(MediaType.APPLICATION_JSON)
          public List<String> example() {
            List<String> l = new ArrayList<>();
            l.add("one"); l.add("two");
            return l; 
          }
    
      }  
      
    }

Create the war file with gradle:

    gradle build war
    
Download the Jetty Runner:

    wget http://central.maven.org/maven2/org/eclipse/jetty/jetty-runner/9.3.0.M1/jetty-runner-9.3.0.M1.jar
    
Now run the application (wait about 20 seconds for it to init):

    java -jar jetty-runner-9.3.0.M1.jar --port 8081 build/libs/your-directory-name.war
    
Now you can run curl to see the output of our rest endpoint above:

    curl localhost:8081/rest/example && echo
    ["one","two"]
