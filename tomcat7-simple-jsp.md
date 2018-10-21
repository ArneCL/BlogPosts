Title: JSP: Scriptlet basics
Tags: java,jsp
date: Apr 30, 2013

If you've a penchant for unmaintainable hacked-up horrors, then scriptlets are for you!

First tell your servlet container you're going to be looking at a JSP page:

		 <web-app xmlns="http://java.sun.com/xml/ns/j2ee" 
		   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
		   xsi:schemaLocation="http://java.sun.com/xml/ns/j2ee http://java.sun.com/xml/ns/j2ee/web-app_2_4.xsd"
		   version="2.4">

		   <display-name> hiya </display-name>
		   <description> A simple jsp </description>

		   <servlet>
		     <servlet-name>HelloServlet</servlet-name>
		     <init-param>
			 <param-name>version</param-name>
			 <param-value>Naught Point Never</param-value>
		     </init-param>
		     <jsp-file>/WEB-INF/hello.jsp</jsp-file>
		   </servlet>
		   <servlet-mapping>
		     <servlet-name>HelloServlet</servlet-name>
		     <url-pattern>/hello.boom</url-pattern>
		   </servlet-mapping> 

		 </web-app>

Note that we have a jsp-file tag instead of a servlet-class to tell Tomcat, or whatever, that we're going to be rendering the pure jsp, not a servlet.

Then create hello.jsp in your WEB-INF folder.

		<%@ page import="javax.servlet.ServletConfig" %>
		<%! String version = "hoo"; %>
		<%!
			public void jspInit() {
				ServletConfig servletConfig = getServletConfig();
				version = servletConfig.getInitParameter("version");
			}
		%>

		<% response.setHeader("X-Current-Level-Of-Woe", "Medium to Moderate"); %>

		<% 
		   if(session.getAttribute("session")==null) {
		    session.setAttribute("session", "#"); 
		   }
		   String s = (String) session.getAttribute("session");
		   session.setAttribute("session", s+"#"); 
		%>
		sess: <%= session.getAttribute("session") %> <br />

		version: <%= version %>
		Version, another way: <%= config.getInitParameter("version") %>

		thing: <%= request.getParameter("thing") %> <br />

The first line is a directive to include a java import into the eventual servlet that JSP pages are turned into. Directives start with an @ symbol.

Then we have a directive that declares and defines a variable. Then we override the jspInit() method that is called once when the servlet is first loaded. In this instance we're just getting the version paramter we defined in the web.xml above and putting it into the thing variable we declared. Declarations start with a ! symbol.

Then we use the implicit 'response' variabl to set a custom header on the response object.

Then we use the implicit session object to set a session variable and display it. Note we display with the = after the opening tag to avoid having to put it all through a printf.

Then we print out the version we set above in the jspInit method. We also get the same result by looking at the implicit 'config' variable. Note the implicit config variable couldn't have been referred to in jspInit(), since that code is executed outside of all the implicit parameters.

Finally we use the implicit request object to get the current paramter for the value 'thing'. A requst of hello.boom?thing=hiya would make that value 'hiya'.

There's also a application implicit object that sets values thoughout all the application.

If you set a error page directives:

		<%@ page errorPage="e.jsp" %>

Then as soon as you do something stupid, like below, you'll go the the e.jsp page.

		<% String hello = null;
		hello.toString();
		%>

You can include a file though a simple declaration:

		<%@ include file="/page.jsp" %>

And this will include a file called page.jsp belong the WEB-INF folder.
