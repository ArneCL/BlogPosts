Title: JSP: Creating a custom EL function
Tags: jsp,jsp-el,el-custom-function

Note I'm creating this custom EL tag in Tomcat 7.

First make a class with a static method like so:

		package your.package;

		public class Functions {
			
			public static String hello(String name) {
				return "Hiya, " + name + ".";
			}

		}

Then make a file called mytaglib.tld in WEB-INF/tags/:

		<?xml version="1.0" encoding="ISO-8859-1" ?>
		<taglib xmlns="http://java.sun.com/xml/ns/j2ee" 
		  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
		  xsi:schemaLocation="http://java.sun.com/xml/ns/j2ee http://java.sun.com/xml/ns/javaee/web-jsptaglibrary_2_1.xsd" 
		  version="2.1"> 
		  
		  <tlib-version>1.0</tlib-version>
		  <uri>http://www.your.url/tablib_name</uri>

		  <function>
		      <name>hello</name>
		      <function-class>your.package.Functions</function-class>
		      <function-signature>java.lang.String hello(java.lang.String)</function-signature>
		  </function>  

		</taglib> 

Note the function part, which specified the name of the new EL function, what class it resides in and its function signature.

The uri would be used if we were accessing this directly, but instead we'll be accessing the url from the web.xml below:

		<web-app 
		    xmlns="http://java.sun.com/xml/ns/j2ee"
		    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
		    xsi:schemaLocation="http://java.sun.com/xml/ns/j2ee http://java.sun.com/xml/ns/j2ee/web-app_2_4.xsd"
		    version="2.4">

		    ...
		 
		   <jsp-config>
			<taglib>
			  <taglib-uri>
			    http://some.thing/mine
			  </taglib-uri>
			  <taglib-location>
			    /WEB-INF/tags/mytaglib.tld
			  </taglib-location>
			</taglib> 
		   </jsp-config>
		   
		   ...
		 
		 </web-app>

Note we're pointing to the mytaglib.tld file just created. And taglib-uri is how we'll refer to it in the JSP:

		<%@ taglib uri="http://some.thing/mine" prefix="a" %> 

		${a:hello("Aaron")}
