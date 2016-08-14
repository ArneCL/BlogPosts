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
        // Returns ArrayList, not a scala List, since Jackson can't convert that
        def example() : ArrayList[String] = {
          var al = new ArrayList[String]()
          al.add("hmm")
          return al
        }
      }
    
      // Not run from a scala script, since that strangely can't find Hello
      def main(args: Array[String]) : Unit = {
        JettyHttpContainerFactory.createServer(
          UriBuilder.fromUri("http://localhost/").port(9998).build(),
          new ResourceConfig(classOf[Hello])
        )
      }
    }

You need these dependencies, which you can use with [this](https://newfivefour.com/gradle-copy-all-dependencies-into-dir.html) via `gradle -b deps.gradle copyDependencies`: 

        compile 'org.glassfish.jersey.bundles:jaxrs-ri:2.23.1'
        compile 'org.glassfish.jersey.containers:jersey-container-jetty-http:2.23.1'
        compile 'org.glassfish.jersey.media:jersey-media-json-jackson:2.16'

Or just download them all via this bash script (urls obtained via the stderr output of the above script):

    wget -P dependencies/ https://repo1.maven.org/maven2/javax/inject/javax.inject/1/javax.inject-1.jar
    wget -P dependencies/ https://repo1.maven.org/maven2/javax/annotation/javax.annotation-api/1.2/javax.annotation-api-1.2.jar
    wget -P dependencies/ https://repo1.maven.org/maven2/javax/ws/rs/javax.ws.rs-api/2.0.1/javax.ws.rs-api-2.0.1.jar
    wget -P dependencies/ https://repo1.maven.org/maven2/javax/validation/validation-api/1.1.0.Final/validation-api-1.1.0.Final.jar
    wget -P dependencies/ https://repo1.maven.org/maven2/javax/servlet/javax.servlet-api/3.1.0/javax.servlet-api-3.1.0.jar
    wget -P dependencies/ https://repo1.maven.org/maven2/org/eclipse/jetty/jetty-http/9.2.14.v20151106/jetty-http-9.2.14.v20151106.jar
    wget -P dependencies/ https://repo1.maven.org/maven2/org/eclipse/jetty/jetty-io/9.2.14.v20151106/jetty-io-9.2.14.v20151106.jar
    wget -P dependencies/ https://repo1.maven.org/maven2/org/eclipse/jetty/jetty-server/9.2.14.v20151106/jetty-server-9.2.14.v20151106.jar
    wget -P dependencies/ https://repo1.maven.org/maven2/org/eclipse/jetty/jetty-util/9.2.14.v20151106/jetty-util-9.2.14.v20151106.jar
    wget -P dependencies/ https://repo1.maven.org/maven2/org/eclipse/jetty/jetty-continuation/9.2.14.v20151106/jetty-continuation-9.2.14.v20151106.jar
    wget -P dependencies/ https://repo1.maven.org/maven2/com/fasterxml/jackson/core/jackson-core/2.3.2/jackson-core-2.3.2.jar
    wget -P dependencies/ https://repo1.maven.org/maven2/com/fasterxml/jackson/core/jackson-databind/2.3.2/jackson-databind-2.3.2.jar
    wget -P dependencies/ https://repo1.maven.org/maven2/com/fasterxml/jackson/core/jackson-annotations/2.3.2/jackson-annotations-2.3.2.jar
    wget -P dependencies/ https://repo1.maven.org/maven2/com/fasterxml/jackson/jaxrs/jackson-jaxrs-base/2.3.2/jackson-jaxrs-base-2.3.2.jar
    wget -P dependencies/ https://repo1.maven.org/maven2/com/fasterxml/jackson/jaxrs/jackson-jaxrs-json-provider/2.3.2/jackson-jaxrs-json-provider-2.3.2.jar
    wget -P dependencies/ https://repo1.maven.org/maven2/com/fasterxml/jackson/module/jackson-module-jaxb-annotations/2.3.2/jackson-module-jaxb-annotations-2.3.2.jar
    wget -P dependencies/ https://repo1.maven.org/maven2/org/glassfish/jersey/core/jersey-server/2.23.1/jersey-server-2.23.1.jar
    wget -P dependencies/ https://repo1.maven.org/maven2/org/glassfish/jersey/core/jersey-client/2.23.1/jersey-client-2.23.1.jar
    wget -P dependencies/ https://repo1.maven.org/maven2/org/glassfish/jersey/core/jersey-common/2.23.1/jersey-common-2.23.1.jar
    wget -P dependencies/ https://repo1.maven.org/maven2/org/glassfish/jersey/containers/jersey-container-servlet-core/2.23.1/jersey-container-servlet-core-2.23.1.jar
    wget -P dependencies/ https://repo1.maven.org/maven2/org/glassfish/jersey/containers/jersey-container-servlet/2.23.1/jersey-container-servlet-2.23.1.jar
    wget -P dependencies/ https://repo1.maven.org/maven2/org/glassfish/jersey/containers/jersey-container-jetty-http/2.23.1/jersey-container-jetty-http-2.23.1.jar
    wget -P dependencies/ https://repo1.maven.org/maven2/org/glassfish/jersey/bundles/jaxrs-ri/2.23.1/jaxrs-ri-2.23.1.jar
    wget -P dependencies/ https://repo1.maven.org/maven2/org/glassfish/jersey/bundles/repackaged/jersey-guava/2.23.1/jersey-guava-2.23.1.jar
    wget -P dependencies/ https://repo1.maven.org/maven2/org/glassfish/jersey/media/jersey-media-json-jackson/2.16/jersey-media-json-jackson-2.16.jar
    wget -P dependencies/ https://repo1.maven.org/maven2/org/glassfish/jersey/media/jersey-media-jaxb/2.23.1/jersey-media-jaxb-2.23.1.jar
    wget -P dependencies/ https://repo1.maven.org/maven2/org/glassfish/jersey/ext/jersey-entity-filtering/2.16/jersey-entity-filtering-2.16.jar
    wget -P dependencies/ https://repo1.maven.org/maven2/org/glassfish/hk2/hk2-api/2.4.0-b34/hk2-api-2.4.0-b34.jar
    wget -P dependencies/ https://repo1.maven.org/maven2/org/glassfish/hk2/hk2-locator/2.4.0-b34/hk2-locator-2.4.0-b34.jar
    wget -P dependencies/ https://repo1.maven.org/maven2/org/glassfish/hk2/osgi-resource-locator/1.0.1/osgi-resource-locator-1.0.1.jar
    wget -P dependencies/ https://repo1.maven.org/maven2/org/glassfish/hk2/hk2-utils/2.4.0-b34/hk2-utils-2.4.0-b34.jar
    wget -P dependencies/ https://repo1.maven.org/maven2/org/glassfish/hk2/external/aopalliance-repackaged/2.4.0-b34/aopalliance-repackaged-2.4.0-b34.jar
    wget -P dependencies/ https://repo1.maven.org/maven2/org/glassfish/hk2/external/javax.inject/2.4.0-b34/javax.inject-2.4.0-b34.jar
    wget -P dependencies/ https://repo1.maven.org/maven2/org/javassist/javassist/3.18.1-GA/javassist-3.18.1-GA.jar

Finally run the program with `scala -cp "dependencies/*" rest.scala`. You should see:

    2016-08-14 16:34:13.759:INFO::main: Logging initialized @791ms
    2016-08-14 16:34:14.160:INFO:oejs.Server:main: jetty-9.2.14.v20151106
    2016-08-14 16:34:14.181:INFO:oejs.ServerConnector:main: Started ServerConnector@5efa40fe{HTTP/1.1}{0.0.0.0:9998}
    2016-08-14 16:34:14.182:INFO:oejs.Server:main: Started @1213ms

You can test it via:

    curl localhost:9998/hello
    ["hmm"]
