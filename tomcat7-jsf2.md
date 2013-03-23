title: Tomcat 7: Setting up JSF 2
tags: tomcat,tomcat-jsf,jsf-setup,jsf

Ensure you have the JSF reference implementation. Using gradle this would be:

		compile 'com.sun.faces:jsf-api:2.1.19'
		compile 'com.sun.faces:jsf-impl:2.1.19'

In your web.xml file you must have:

		<?xml version="1.0" encoding="UTF-8"?>
		<web-app version="3.0"
			   xmlns="http://java.sun.com/xml/ns/javaee" 
			   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
			   xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd">
		      <servlet>
			  <servlet-name>Faces Servlet</servlet-name>
			  <servlet-class>javax.faces.webapp.FacesServlet</servlet-class>
			  <load-on-startup>1</load-on-startup>
		      </servlet>
		      <servlet-mapping>
			  <servlet-name>Faces Servlet</servlet-name>
			  <url-pattern>/faces/*</url-pattern>
		      </servlet-mapping>
		      <welcome-file-list>
			  <welcome-file>faces/hello.xhtml</welcome-file>
		      </welcome-file-list>
		</web-app>

This includes the faces servlet, and sets up a serlvet mapping that intercepts anything that has the faces/* url. Our welcome file will be hello.xhtml.

In our WEB-INF/ folder we now need to define that hello.xhtml file:

		<?xml version='1.0' encoding='UTF-8' ?>
		<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
		<html lang="en"
		      xmlns="http://www.w3.org/1999/xhtml"
		      xmlns:h="http://java.sun.com/jsf/html">
		    <h:head>
			<title>Facelets Hello World</title>
		    </h:head>
		    <h:body>
			Hiya
		    </h:body>
		</html>

Now the differing h namespace that includes all the JSF tags. We'll look at those later.

Now if you go to http://localhost:8080/YOUR_WAR_NAME/faces/index.xhtml you'll see your face. http://localhost:8080/YOUR_WAR_NAME/ will go to the same thanks to the welcome-file-list above.
