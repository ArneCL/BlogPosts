title: Scala: Simplest Jersey service with Jetty returning JSON via Jackson
tags: scala,jersey,jetty,jackson

If you want a quick web service with Jersey in Jetty returning JSON, you must:

* Define the basic Jersey class with annotations.
* Use `JettyHttpContainerFactory` to start the Jetty service.

Let's put it all together, in a file called `rest.scala`.

    import java.util.ArrayList
    import javax.servlet.http.{HttpServletRequest, HttpServletResponse}
    import javax.ws.rs.{ApplicationPath, GET, Path, Produces}
    import javax.ws.rs.core.{MediaType, UriBuilder}
    import javax.ws.rs.{ApplicationPath, GET, Path, Produces}
    import javax.ws.rs.core.{MediaType}
    import org.eclipse.jetty.server.handler.AbstractHandler
    import org.eclipse.jetty.server.{Server, Request}
    import org.glassfish.jersey.server.ResourceConfig
    import org.glassfish.jersey.jetty.JettyHttpContainerFactory
    
    object rest {
    
      @Path("/") class Hello {
        @Path("hello") @GET @Produces(Array(MediaType.APPLICATION_JSON))
        // Returns ArrayList, not a scala List, since Jackson can't convert
        def example() : ArrayList[String] = {
          var al = new ArrayList[String]()
          al.add("hmm")
          return al
        }
      }
    
      // Not run from a scala script, since that has strange problems finding the class Hello
      def main(args: Array[String]) : Unit = {
        JettyHttpContainerFactory.createServer(
          UriBuilder.fromUri("http://localhost/").port(9998).build(),
          new ResourceConfig(classOf[Hello])
        )
      }
    }

You need all the jackson, jersey and jetty dependencies. I use [this](https://newfivefour.com/gradle-copy-all-dependencies-into-dir.html) to download all the dependencies into the directory `dependencies`. Here they are:

     compile 'org.glassfish.jersey.bundles:jaxrs-ri:2.23.1'
     compile 'org.glassfish.jersey.containers:jersey-container-jetty-http:2.23.1'
     compile 'org.glassfish.jersey.media:jersey-media-json-jackson:2.16'

Finally run the program with `scala -cp "dependencies/*" rest.scala`. You should see:

    2016-08-14 16:34:13.759:INFO::main: Logging initialized @791ms
    2016-08-14 16:34:14.160:INFO:oejs.Server:main: jetty-9.2.14.v20151106
    2016-08-14 16:34:14.181:INFO:oejs.ServerConnector:main: Started ServerConnector@5efa40fe{HTTP/1.1}{0.0.0.0:9998}
    2016-08-14 16:34:14.182:INFO:oejs.Server:main: Started @1213ms
