title: Quick start a RESTful project with Jersey, Jetty and Gradle
Tags: jersey,java,jetty,gradle,java-quick-start

Make the project directory and the directory structure for Gradle:

    mkdir YOUR_PROJECT_DIR && cd YOUR_PROJECT_DIR
    mkdir -p {src/main/java/com/example/YOURPROJECT/,src/main/resources/META-INF,src/main/webapp/WEB-INF,logs}

Next create the Gradle build file, including the war and eclipse plugins, and the logging, jersey and jersey json jars.

    echo "
    apply plugin: 'war'
    apply plugin: 'eclipse'
    
    repositories {
        mavenCentral()
    }
    
    dependencies {
        compile 'log4j:log4j:1.2.7'
        compile 'org.slf4j:slf4j-log4j12:1.6.6'
        compile 'org.glassfish.jersey.media:jersey-media-json-jackson:2.6'
        compile 'org.glassfish.jersey.containers:jersey-container-servlet:2.6'
    }" > build.gradle
    
Next create the log4j.properties file.

    echo "
    log4j.rootCategory=INFO, rollingFile 
    
    log4j.appender.rollingFile=org.apache.log4j.RollingFileAppender
    log4j.appender.rollingFile.File=logs/YOUR_LOG_FILE.log
    log4j.appender.rollingFile.MaxFileSize=10MB
    log4j.appender.rollingFile.MaxBackupIndex=2
    log4j.appender.rollingFile.layout = org.apache.log4j.PatternLayout
    log4j.appender.rollingFile.layout.ConversionPattern=%d{yyyy-MM-dd HH-mm-ss} %-5p [%t] %c %x - %m%n
    " > src/main/resources/log4j.properties
    
Next create the web.xml file starting Jersey by pointing to a yet-to-be-created application class, specifying the package where the request classes will live, and defining a path for the REST calls.

    echo '
    <web-app xmlns="http://java.sun.com/xml/ns/j2ee" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    	xsi:schemaLocation="http://java.sun.com/xml/ns/j2ee http://java.sun.com/xml/ns/j2ee/web-app_2_4.xsd"
    	version="2.4">
    
    	<display-name>YOUR_SERVICE</display-name>
    	
    	<servlet>
    		<servlet-name>YOUR_SERVLET_NAME</servlet-name>
    		<servlet-class>org.glassfish.jersey.servlet.ServletContainer</servlet-class>
            <init-param>
                <param-name>javax.ws.rs.Application</param-name>
                <param-value>com.example.YOURPROJECT.JerseyApplication</param-value>
            </init-param>		
    	    <init-param>
    	    	<param-name>jersey.config.server.provider.packages</param-name>
    			<param-value>com.example.YOURPROJECT</param-value>
    	    </init-param>
    	    <load-on-startup>1</load-on-startup>
    	</servlet>
    	<servlet-mapping>
    		<servlet-name>YOUR_SERVLET_NAME</servlet-name>
    		<url-pattern>/YOUR_PATH/*</url-pattern>
    	</servlet-mapping>
    	
    </web-app>
    ' > src/main/webapp/WEB-INF/web.xml
    
Now create that JerseyApplication file we referred to.

    echo "
    package com.example.YOURPROJECT;
    
    import org.glassfish.jersey.jackson.JacksonFeature;
    import org.glassfish.jersey.server.ResourceConfig;
    
    public class JerseyApplication extends ResourceConfig {
    	public JerseyApplication() {
    		register(JacksonFeature.class);
    	}
    }

    " > src/main/java/com/example/YOURPROJECT/JerseyApplication.java
    
Now create a simple Jersey request.

    echo '
    package com.example.YOURPROJECT;
    
    import javax.ws.rs.GET;
    import javax.ws.rs.Path;
    import javax.ws.rs.PathParam;
    import javax.ws.rs.Produces;
    import javax.ws.rs.core.MediaType;
    
    import org.apache.log4j.Logger;
    
    @Path("example")
    public class ExampleRequest {
    	
    	@Path("{example}")
    	@GET
    	@Produces(MediaType.TEXT_PLAIN)
    	public String example(@PathParam("example") String example) {
    		Logger.getLogger(getClass()).info("Working???");
    		return example + "!!!!";
    	}
    
    }
    ' > src/main/java/com/example/YOURPROJECT/ExampleRequest.java
    
Get the jetty runner down.

    wget http://repo1.maven.org/maven2/org/eclipse/jetty/jetty-runner/9.1.0.M0/jetty-runner-9.1.0.M0.jar
    
Build the project, which creates a WAR file, and then use the runner to run it on port 8081.

    gradle build
    java -jar jetty-runner-9.1.0.M0.jar --port 8081 build/libs/YOUR_PROJECT_DIR.war
     
Now you should be able envoke the re quest you defined earlier by visiting its url (and check the log file after you do so).

    http://localhost:8081/YOUR_PATH/example/some_text
