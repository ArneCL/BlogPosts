title: Simplest Jetty server in Scala
tags: scala,jetty

Let's first download the jetty runner:

    wget http://central.maven.org/maven2/org/eclipse/jetty/jetty-runner/9.4.0.M0/jetty-runner-9.4.0.M0.jar

Then create a Scala file, `server.scala`, that creates a `AbstractHandler` class, which handles incoming request, and outputs some text.

    import org.eclipse.jetty.server.handler.AbstractHandler
    import org.eclipse.jetty.server.{Server, Request}
    import javax.servlet.http.{HttpServletRequest, HttpServletResponse}
    
    class Handler extends AbstractHandler {
      var html = <h1>Something, innit</h1>
    
      override def handle(target: String,
                          req: Request,
                          httpReq: HttpServletRequest,
                          httpRes: HttpServletResponse) = {
        httpRes.setContentType("text/html")
        httpRes.setStatus(HttpServletResponse.SC_OK)
        httpRes.getWriter().println(html.toString)
        req.setHandled(true)
      }
    }
    
    val server = new Server(8080)
    server.setHandler(new Handler)
    server.start

Finally run the Scala program.

    scala -cp jetty-runner-9.4.0.M0.jar server.scala

You can now visit `http://localhost:8080` to reach it. It'll take about 15 seconds to load.
