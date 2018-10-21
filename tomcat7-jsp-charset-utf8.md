Title: JSP: Changing the page encoding to UTF-8
Tags: jsp,jsp-charset
date: May 1, 2013

Put this in your web.xml to change the page encoding:

		<jsp-config>
			<jsp-property-group>
				<url-pattern>*.jsp</url-pattern>
				<page-encoding>UTF-8</page-encoding>
			</jsp-property-group>
		</jsp-config> 

Now any jsp file you render, from a servlet or wherever, will have the UTF-8 charset in its response headers, i.e:

		Content-Type:text/html;charset=UTF-8
