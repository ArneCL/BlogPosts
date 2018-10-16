title: Android: Trust all SSL certificates in Volley
tags: android,android-volley,ssl
date: Mar 26, 2014

This goes for more than just Volley, but a quick and easy way to accept all certificates is:

    public static class NukeSSLCerts {
        protected static final String TAG = "NukeSSLCerts";
     
        public static void nuke() {
            try {
                TrustManager[] trustAllCerts = new TrustManager[] { 
                    new X509TrustManager() {
                        public X509Certificate[] getAcceptedIssuers() {
                            X509Certificate[] myTrustedAnchors = new X509Certificate[0];  
                            return myTrustedAnchors;
                        }
            					
                        @Override
                        public void checkClientTrusted(X509Certificate[] certs, String authType) {}
            		  
                        @Override
                        public void checkServerTrusted(X509Certificate[] certs, String authType) {}
                    }
                };
    			
                SSLContext sc = SSLContext.getInstance("SSL");
                sc.init(null, trustAllCerts, new SecureRandom());
                HttpsURLConnection.setDefaultSSLSocketFactory(sc.getSocketFactory());
                HttpsURLConnection.setDefaultHostnameVerifier(new HostnameVerifier() {
                    @Override
                    public boolean verify(String arg0, SSLSession arg1) {
                        return true;
                    }
                });
            } catch (Exception e) { 
            }
        }
    }    
    
You can run this in your Application class's onCreate() and volley will no longer complain about not trusting the certificate.

This is obviously very dangerous and should only be used during testing.

Credits go to: http://engineering.sproutsocial.com/2013/09/android-using-volley-and-loopj-with-self-signed-certificates/
