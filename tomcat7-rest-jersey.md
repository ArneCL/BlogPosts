Title: Tomcat 7: REST services with Jersey
Tags: java-jersey|java|java-servlet|java-tomcat
Date: 2013-02-19 19:35:05 -0500 

First download Apache Jersey. I downloaded the archive with the follow jars in them and placed them in /usr/share/tomcat7/lib and restarted tomcat.

     asm-3.1.jar
     jackson-core-asl-1.9.2.jar
     jackson-jaxrs-1.9.2.jar
     jackson-mapper-asl-1.9.2.jar
     jackson-xc-1.9.2.jar
     jersey-client-1.17.jar
     jersey-core-1.17.jar
     jersey-json-1.17.jar
     jersey-server-1.17.jar
     jersey-servlet-1.17.jar
     jettison-1.1.jar
     jsr311-api-1.1.1.jar

I had to increase Tomcat's memory size to avoid out of memory errors. I put this line at the top of /usr/share/tomcat7/bin/catalina.sh 

 JAVA_OPTS='-Xmx512m'

Then you can create a simple POJO with the @XMLRootElement annotation. This will allow it to be converted into JSON for the REST services (Yes, it does say XMLRoot...)

     @XmlRootElement
     public class JsonObject {
       private String str;
       public String getStr() {
          return str;
       }
       public void setStr(String str) {
          this.str = str;
       }
     }

Next you can create your REST class by creating a class like the following: 

     @Path("/rest")
     public class Rest {
       @Context
       UriInfo info;
       @Context
       Request request;
       @Context
       ServletContext context;
       ...
       @PostConstruct
       public void init() {
       }
     }

This defines a new rest api that will have the '/rest/' prefix. The @Context annotation injects  UriInfo and details of the actual request that you may want to use. You can access these methods in a method annotated with @PostConstruct

The real logic comes in the method signatures:

     @GET
     @Path("/r")
     @Produces(MediaType.TEXT_PLAIN)
     public String sayRest() {
       return "rest";
     }
    
     @GET
     @Path("/r")
     @Produces(MediaType.TEXT_HTML)
     public String sayRest() {
       return "html text";
     }

This will produce different responses, depending on whether the client is asking for plain text or html. The path is /rest/r.

This produces and consumes the POJO object we created above:

     @PUT
     @Path("/j")
     @Produces(MediaType.APPLICATION_JSON)
     @Consumes(MediaType.APPLICATION_JSON)
     public JsonObject intakeJson(JsonObject intake) {
       intake.setStr("intaken: " + intake.getStr());
       return intake;
     }

You can either pass in query parameters or path parameters:

     @GET
     @Path("/r")
     @Produces(MediaType.TEXT_HTML)
     public String sayRestInHtml(@QueryParam("q") String q) {
       return "rest: "+q;
     }  
     
     @GET
     @Path("/r/{q}")
     @Produces(MediaType.TEXT_HTML)
     public String sayRestInHtmlWithPath(@PathParam("q") String q) {
       return "rest with param: "+q;
     }

You'd access these via /rest/r?q=sdfsdf and /rest/r/sdfsdf.

You can craft HTTP responses using:
 
     Response.created(info.getAbsolutePath()).build();

This creates a CREATED HTTP response with the absolute path gained from the UriInfo via the @Context annotation above.

You now need to edit your web.xml to activate this servlet:

      <servlet>
        <servlet-name>Jersey REST Service</servlet-name>
        <servlet-class>com.sun.jersey.spi.container.servlet.ServletContainer</servlet-class>
        <init-param>
          <param-name>com.sun.jersey.config.property.packages</param-name>
          <param-value>org.denevell.tomcat.rest</param-value>
        </init-param>
        <init-param>
          <param-name>com.sun.jersey.api.json.POJOMappingFeature</param-name>
          <param-value>true</param-value>
        </init-param>		    
        <load-on-startup>1</load-on-startup>
      </servlet>
      <servlet-mapping>
        <servlet-name>Jersey REST Service</servlet-name>
        <url-pattern>/rest/*</url-pattern>
      </servlet-mapping>

This is a normal servlet mapping except the servlet-class is a Jersey class, and the init-param state where the REST class is. And the com.sun.jersey.api.json.POJOMappingFeature ensures you use Jackson instead of the standard Java implementation JaxB (which you don't want).

You final urls will be such as 

     /rest/rest/r
