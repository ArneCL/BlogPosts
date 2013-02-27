Title: Tomcat 7: Servlet filters
Tags: tomcat|tomcat-filters
Date: 2013-02-20 19:24:59 -0500 
Author: Denevell


You can filter all servlet requests, including REST ones with Jersey, with a filter:

     public class HelloFilter implements Filter {
      @Override
      public void destroy() {
      }
      @Override
      public void doFilter(ServletRequest req, ServletResponse resp, 
               FilterChain chain) throws IOException, ServletException {
        chain.doFilter(req, resp);
      }
      @Override
      public void init(FilterConfig arg0) throws ServletException {
      }
     }

In the doFilter() method you call the rest of the filters on the chain to continue. Alternatively, you can just bail out there with something like:

      HttpServletResponse r = (HttpServletResponse) resp;
      r.setStatus(HttpServletResponse.SC_GONE);

The filter allows you do look at the request and response, do various things with the servletcontext or httpservletrequest the latterly called doGet or REST method will see such changes.

You can register this in your web.xml like so:

      <filter>
        <filter-name>Filter</filter-name>
        <filter-class>
          org.denevell.tomcat.filters.HelloFilter
        </filter-class>
      </filter>
      <filter-mapping>
        <filter-name>Filter</filter-name>
        <url-pattern>/*</url-pattern>
      </filter-mapping>
