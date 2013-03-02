Title: Tomcat 7: JDBC via JNDI using sqlite
Tags: java|tomcat-jndi|tomcat-jdbc|jdbc|sql|sqlite|tomcat
Date: 2013-02-12 17:27:00 -0500 
Author: Denevell

First download the sqlite jdbc driver from https://bitbucket.org/xerial/sqlite-jdbc/downloads and copy it into your lib/ folder in your tomcat directory, /usr/share/tomcat7/lib/. Then restart tomcat so it can find your new jar.

Then add a reference to a new jdbc resource in your web/META-INF/context.xml file. It defines a JNDI name, its class type, the driver class name that relates to the jar we just installed above, and a url to connect to the database. In my case I'm pointing to a directory (which must exist) on the file system.

<Context>
<Resource name="jdbc/sqlite"
type="javax.sql.DataSource"
driverClassName="org.sqlite.JDBC"
url="jdbc:sqlite:/var/lib/tomcat7/dbs/test.db"
>
</Resource>
</Context>

In addition, you have to add the resource in your web.xml file. Note the name is the same the name above.

...
<resource-ref>
<res-ref-name>jdbc/sqlite</res-ref-name>
<res-type>javax.sql.DataSource</res-type>
</resource-ref>
...

Now you can make reference to the database in your Java code. This is  lifted from the sqlite example page:

Connection conn = null;
try {
Context ctx = new InitialContext();
DataSource ds = (DataSource) ctx.lookup("java:comp/env/jdbc/sqlite");
conn = ds.getConnection();
Statement statement = conn.createStatement();
try {
statement.executeUpdate("create table thing(x integer)");
} catch (Exception e) { 
 // Could well be already there
}
statement.executeUpdate("insert into thing values(42)");
ResultSet rs = statement.executeQuery("select * from thing");
while (rs.next()) {
writer.println("id = " + rs.getInt(1));

} catch (Exception e) {
writer.println(e.getMessage());
} finally {
try {
if (conn != null) conn.close();
} catch (SQLException e) {
writer.println(e);
}
}
