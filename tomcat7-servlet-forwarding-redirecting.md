Title: Servlets: Forwarding and Redirecting
Tags: servlet|servlet-forwarding

If you want a 302 redirect, where res is a HttpServletResponse:

		res.sendRedirect("/YourContextPath/YourServletPath/PathToServlet");

The first part of the path will be the name your site has in the container. If you uploaded SomeWar file, and Tomcat give it that name to request, your context path will be that.

The next part is either blank or the path to your servlet. For example, if you url-pattern in your web.xml is /somepath/* then this will be 'somepath'.

The final part is the path to your servlet.

If you want to transparently forward to another servlet, keeping the existing objects in your HttpServletRequest:

		RequestDispatcher disp = httpServletRequest.getRequestDispatcher("/YourServletPath/PathToServlet");
		disp.forward(req, res);

The url here is the same as before but without the context path.
