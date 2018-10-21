Title: JSP: Actions basics
Tags: java,jsp
date: May 1, 2013

Actions are marginally nicer versions of scriptlets, at least some actions that you can perform in scriptlets. 

		<jsp:include page="some.jsp">
			<jsp:param name="hi" value="there />
		</jsp:include>

This will include a file like scriptlet, but it's run at runtime, so the page value can be dynamically created.

You can import a Java bean (a getter and setter object with an empty constructor). 

		<%@ page import="thing.Hello" %>
		<jsp:useBean id="bean" class="thing.Hello" />

The actual bean is this is simple enough:

		package thing;
		public class Bean {

			private String thing = "";

			public String getThing() {
				return thing;
			}

			public void setThing(String thing) {
				this.thing = thing;
			}
		}

Now you can access it using a scriptlet using the variable 'bean'. You can also use the getProperty and setProperty action:

		<jsp:setProperty name="bean" property="thing" value="SAAATTAAAN" />

		<jsp:getProperty name="bean" property="thing" />

You can also use the getProperty and setProperty actions to manipulate request parameters. Below we set the object based on the URL parameter other:

		<jsp:setProperty name="bean" property="thing" param="other" />

If you omit the 'param' part, we'll set the thing property via thing in the URL, example.com/hiya?thing=THIS, for example. Or if we put a '*' in the property we'll set the entire bean via parameter properties.

You can also forward pages to another page, and pass parameters there:

		<% if(bean.getThing().equals("SAAAATAAAAAN")) { %>
			<jsp:forward page="e.jsp">
				<jsp:param name="hi" value="X" />
			</jsp:forward>
		<% } %> 
