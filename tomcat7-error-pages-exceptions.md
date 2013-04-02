Title: Tomcat 7: Error pages for exceptions and error codes
Tags: tomcat,tomcat-error-pages

You can specify an error page in your web folder for either an exception or a standard error code.

The below makes error404.html be shown each time an array out of bounds error occurs.

		<error-page>
			<!-- <error-code>404</error-code> -->
			<exception-type>java.lang.ArrayIndexOutOfBoundsException</exception-type>      
			<location>/error404.html</location>
		</error-page>  

