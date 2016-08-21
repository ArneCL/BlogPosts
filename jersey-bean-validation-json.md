title: Jersey: Bean validation with JSON return objects
tags: jersey, bean-validation, jackson, scala

Here's how to get JSON error messages detailing validation errors in your REST input.

I'm doing this in Scala, but the Java version is obviously nearly the same.

First let's look at our gradle dependencies, jaxrs, jetty, jackson, bean validation and our default logger.

     compile 'org.glassfish.jersey.bundles:jaxrs-ri:2.23.1'
     compile 'org.glassfish.jersey.containers:jersey-container-jetty-http:2.23.1'
     compile 'org.glassfish.jersey.media:jersey-media-json-jackson:2.16'
     compile 'org.glassfish.jersey.ext:jersey-bean-validation:2.23.2'
     compile "org.slf4j:slf4j-simple:1.6.1"

We need to turn bean validation error messages on in our ResourceConfig:

    new ResourceConfig() {
      register(classOf[Hello])
      property(ServerProperties.BV_SEND_ERROR_IN_RESPONSE, true)
    }

We'll define a class with @NonNull contraints, specifying Jackon will deserialise looking at fields not getters and setters for convenience.

    @JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
    class RegisterUser() {
      @NotNull var email: String = ""
      @NotNull var username: String = ""
      @NotNull var password: String = ""
    }

Now the standard Jersey resource class, but now with the `@Valid` annotation on the POST object. 

    @Path("/") class Hello {
      @Path("register") @POST @Produces(Array(MediaType.APPLICATION_JSON))
      def register(@Valid register: RegisterUser) : RegisterUser = return register
    }

Let's put it altogether:

    import javax.validation.constraints.{NotNull};
    import javax.validation.{Valid};
    import javax.ws.rs.core.{MediaType, UriBuilder}
    import javax.ws.rs.{ApplicationPath, Path, Produces, POST}
    import org.glassfish.jersey.server.{ResourceConfig, ServerProperties}
    import org.glassfish.jersey.jetty.JettyHttpContainerFactory
    import com.fasterxml.jackson.annotation.{JsonAutoDetect}
    
    object rest {
    
      @JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
      class RegisterUser() {
        @NotNull var email: String = ""
        @NotNull var username: String = ""
        @NotNull var password: String = ""
      }
    
      @Path("/") class Hello {
        @Path("register") @POST @Produces(Array(MediaType.APPLICATION_JSON))
        def register(@Valid register: RegisterUser) : RegisterUser = return register
      }
    
      def main(args: Array[String]) : Unit = {
        JettyHttpContainerFactory.createServer(
          UriBuilder.fromUri("http://localhost/").port(8901).build(),
          new ResourceConfig() {
            register(classOf[Hello])
            property(ServerProperties.BV_SEND_ERROR_IN_RESPONSE, true)
          }
        )
      }
    
    }

Let's run the application using `scala -cp "dependencies/*" valid.scala` (dependencies is where my dependencies are. See [this](https://newfivefour.com/gradle-copy-all-dependencies-into-dir.html).

Here's the curl command detailing the error in JSON:

    curl -H "accept: application/json" -H "content-type: application/json" -X POST -d '{"username": "me", "email": null, "password":"p"}' http://localhost:8901/register
    [{"message":"may not be null","messageTemplate":"{javax.validation.constraints.NotNull.message}","path":"Hello.register.arg0.email","invalidValue":null}]

