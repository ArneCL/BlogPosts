title: PART 2: Using JSON with Jersey 2
Tags: jersey,java,json,java-web-quick-start

(This is part of a series http://blog.denevell.org/category_java-web-quick-start.html)

We previously included the import in our build.gradle

    compile 'org.glassfish.jersey.media:jersey-media-json-jackson:2.6'
    
And created a JerseyApplication that had the line

    register(JacksonFeature.class);
    
This allows use to use JSON via the Jackson library with Jersey.

Now create a POJO which we'll use for transmitting the JSON. (Note the @XMLRootElement annotation which means it'll be serialised, into JSON in our case).

    echo '
    package com.example.YOURPROJECT;
    
    import javax.xml.bind.annotation.XmlRootElement;
    
    @XmlRootElement
    public class ExampleResource {
    	
    	private String stuff;
    
    	public String getStuff() {
    		return stuff;
    	}
    
    	public void setStuff(String stuff) {
    		this.stuff = stuff;
    	}
    
    }
    ' > src/main/java/com/example/YOURPROJECT/ExampleResource.java
    

Now let's create a new request that will return an array of these objects.


    echo '
    package com.example.YOURPROJECT;
    
    import java.util.ArrayList;
    import java.util.List;
    
    import javax.ws.rs.GET;
    import javax.ws.rs.Path;
    import javax.ws.rs.Produces;
    import javax.ws.rs.core.MediaType;
    
    @Path("example_json")
    public class ExampleJSONRequest {
    
    	@GET
    	@Produces(MediaType.APPLICATION_JSON)
    	public List<ExampleResource> example() {
    		ArrayList<ExampleResource> resList = new ArrayList<ExampleResource>();
    		ExampleResource exampleItem = new ExampleResource();
    		exampleItem.setStuff("Some stuff");
    		resList.add(exampleItem);
    		ExampleResource exampleItem1 = new ExampleResource();
    		exampleItem1.setStuff("Some more stuff");
    		resList.add(exampleItem1);
    		return resList;
    	}
    
    }
    ' > src/main/java/com/example/YOURPROJECT/ExampleResource.java

The differences from our previous request are that the @Path has changed, we're not longer concerned about a @PathParam, and the @Produces method now says we're returning JSON, not plain text.

Let's now build it, run it and look at the response.

    gradle build
    java -jar jetty-runner-9.1.0.M0.jar --port 8081 build/libs/YOUR_PROJECT_DIR.war
    curl http://localhost:8081/YOUR_PATH/example_json && echo
    [{"stuff":"Some stuff"},{"stuff":"Some more stuff"}]
