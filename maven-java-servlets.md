title: Maven p20: Java servlets
date: 2012-3-24 23:55:03
tags: maven,java,servlet

To actually use Servlets in your webapp, we need a depedency which gives us all the J2EE goodness, the OSS Apache Geronimo project. The mvn depedency can be found here: http://mvnrepository.com/artifact/org.apache.geronimo.specs/geronimo-servlet_2.5_spec/1.2 Let's put that in the dependencies section of your pom.xml:

		...
		<dependency>
			<groupId>org.apache.geronimo.specs</groupId>
			<artifactId>geronimo-servlet_2.5_spec</artifactId>
			<version>1.2</version>
		</dependency>
		...


Now we need to tell web.xml that we're going to create a servlet, and give it a mapping also:

		<web-app>
		  <display-name>Archetype Created Web Application</display-name>
		  <servlet>
			<servlet-name>simple</servlet-name>
			<servlet-class>your.pkg.simpleservlet.SimpleServlet</servlet-class>
		  </servlet>
		  <servlet-mapping>
			<servlet-name>simple</servlet-name>
			<url-pattern>/simple</url-pattern>
		  </servlet-mapping>
		</web-app>

We're saying they'll be a servlet, called simple, and we give its to-be-created class. Then we map its name to a url pattern. Let's now create that class in src/main/java/your.pky.simpleservlet

		package your.pkg.simpleservlet;

		import java.io.IOException;
		import java.io.PrintWriter;
		import java.util.Date;

		import javax.servlet.ServletException;
		import javax.servlet.http.HttpServlet;
		import javax.servlet.http.HttpServletRequest;
		import javax.servlet.http.HttpServletResponse;
		import javax.servlet.http.HttpSession;

		public class SimpleServlet extends HttpServlet {
			public void doGet(HttpServletRequest request, 
					HttpServletResponse response)
				throws ServletException, IOException {

				PrintWriter out = response.getWriter();

				HttpSession lSess = request.getSession(true);
				int lInactive = lSess.getMaxInactiveInterval();
				long lTime = lSess.getLastAccessedTime();
				lSess.setAttribute("bar", "Hello, session attribute!");
				String att = (String) lSess.getAttribute("bar");

				out.println(att);
				out.flush();
				out.close();
			}

			@Override
			public void init() throws ServletException {
				super.init();
				System.out.println("init'd");
			}

			@Override
			public void destroy() {
				super.destroy();
				System.out.println("destroy'd");
			}
		}

Notice we're importing lots of servlet classes. These are given to use by the Geronimo project. The class extends a HttpServlet. init() and destory() are called at moments that you can imagine well enough yourself. The doGet() is called during a GET request. Whatever's written to the HttpServletResponse is outputted. And we can get session information, even getting session variables.
