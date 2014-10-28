title: Java Servlet: Servering static content
tags: java,java-servlet,java-servlet-static-content

If you want to server static content -- like PNGs, Javascript, etc -- you need to explicitly tell your server this in its web.xml

Edit: I've changed this article due to an error and infelicitiy:

Add this file somewhere, and, voila, all the files in your res/ directory (in src/main/webapp/res in the gradle directory structure, that is) will be served.

@WebServlet("res/*")
public class ResourcesServlet extends HttpServlet {
  private static final long serialVersionUID = 1L;

  public void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    RequestDispatcher rd = getServletContext().getNamedDispatcher("default");
    HttpServletRequest wrapped = new HttpServletRequestWrapper(req) {
      public String getServletPath() {
        return "/res/";
      }
    };
    rd.forward(wrapped, resp);
  }
}
