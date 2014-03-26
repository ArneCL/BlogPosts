Title: Jetty 9: Enabling SSL in Embedded Jetty
tags: java,jetty,ssl,https

First create a HttpConfiguration with a HTTP configuration that explains its secure scheme and port:

    HttpConfiguration http_config = new HttpConfiguration();
    http_config.setSecureScheme("https");
    http_config.setSecurePort(8443);

Then we'll create another HttpConfiguration for https that extends from the above but adds a SecureRequestCustomizer

    HttpConfiguration https_config = new HttpConfiguration(http_config);
    https_config.addCustomizer(new SecureRequestCustomizer());	        
    
Next create a SslContextFactory that points to your Java keystore

    SslContextFactory sslContextFactory = new SslContextFactory("/its_dir/cert.keystore");
    sslContextFactory.setKeyStorePassword("password");
	        
Note you can prefix the password with OBF: if you're going to use the Jetty obfuscated password.

Next we're creating the ServerConnector, passing in the Server class, a SslConnectorFactory and a HttpConnectionFactory.

    ServerConnector httpsConnector = new ServerConnector(server, 
    		new SslConnectionFactory(sslContextFactory, "http/1.1"),
    		new HttpConnectionFactory(https_config));
    httpsConnector.setPort(8443);
    httpsConnector.setIdleTimeout(50000);	        
    
Finally use this connector, maybe along with a normal Http ServerConnector, to the Server.

    server.setConnectors(new Connector[]{ httpsConnector });
