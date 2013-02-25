{{wl-tags:java|java-io}}{{wl-publish: 2012-12-17 08:54:56 -0500 | Denevell }}
Title: Java: Loading a file from the classpath

If you want to load a text file from the classpath, here's a simple way to do this horrid activity:

     public class TextFileLoader {
         public static String getFileFromClasspath(final String path) {
         final URL r = TextFileLoader.class.getResource(path);
         String result = "";
         try {
             final InputStream is = (InputStream) r.getContent();
             final BufferedReader reader = new BufferedReader(new InputStreamReader(is));
             String l = null;
             while((l=reader.readLine())!=null) {
               result+=l;
             }
         } catch (final Exception e) {
             e.printStackTrace();
             return null;
         }
         return result;
       }
}
