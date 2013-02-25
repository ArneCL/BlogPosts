{{wl-tags:twitter|oauth|java}}{{wl-publish: 2012-11-19 16:39:36 -0500 | Denevell }}

The horror that is Twitter's API, since version 1.1, and OAuth make for an aneurysm-inducing combination.

Here's how you start using 1.1 of their API using Scribe.

1) Register an application on Twitter's developers page. That'll give you a OAuth API key and secret. You must also give your application a URL callback in the settings screen.

2) Create an OAuthService using Scribe, and get its RequestToken and its Authorisation URL. Do this in a background task, or Android will freak, since we shouldn't do networking code on the UI Thread.

        service = new ServiceBuilder()
          .provider(TwitterApi.class)
          .apiKey("YourApiKey")
          .callback("http://YourCallback.com")
          .apiSecret("YourApiSecret")
          .build();
        requestToken = service.getRequestToken();
        String authUrl = service.getAuthorizationUrl(requestToken);

3) You then need to load that URL in a web view. The user will be asked to authorise your application to use their twitter account. Your callback will then be called. You can then extract the verifier string.

        webview.setWebViewClient(new WebViewClient(){
            @Override
              public boolean shouldOverrideUrlLoading(WebView view, String url){
                if(url.startsWith("http://YourCallback.com")){
                  Uri uri = Uri.parse(url);
                  String verifier = uri.getQueryParameter("oauth_verifier");
                  verifier = new Verifier(verifier);
                  return true;
                }
                return super.shouldOverrideUrlLoading(view, url);
              }
        });
  webview.loadUrl(authUrl);

4) Once you have the verifier string, you run another background task to get the AccessToken using this verifier string and the request token you gained at the start. You use this to sign all future API calls.

      Token accessToken = service.getAccessToken(requestToken, verifier); 

5) Once you have this, you no longer need anything else exception the service. You can now use the AccessToken to sign requests:

      OAuthRequest req = new OAuthRequest(Verb.GET,"https://api.twitter.com/1.1/account/verify_credentials.json");
      service.signRequest(accessToken, req);
      Response response = req.send();
      String body = response.getBody();

