Title: Tomcat 7: Testing REST interfaces with Jersey
{{wl-tags:tomcat|java|jersey|REST|java-testing}}{{wl-publish: 2013-02-20 17:07:05 -0500 | Denevell }}

You can test REST services with Jersey's client library easily enough.

     public class RestTest {
      @Test
      public void addAnotherThing() {
        // Arrange
        ClientConfig config = new DefaultClientConfig();
        Client client = Client.create(config);
        WebResource service = client.resource(getBaseURI());
        // Act
        String result = service.path("rest").path("r").accept(MediaType.TEXT_PLAIN).get(String.class);
        // Assert
        assertEquals("Get should be 'rest'", "rest", result);
       }     
       private static URI getBaseURI() {
         return UriBuilder.fromUri("http://localhost:8080/hiya/rest/").build();
       }
     }

In this you use the Jersey ClientConfig, Client and WebResource to eventually make a url request that accepts plain text and get a string from that, finally asserting that to be a specific value.
