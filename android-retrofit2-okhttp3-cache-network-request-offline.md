title: Android: Cache network requests for offline access with Retrofit2 and OkHTTP3
tags: android,android-retrofit,android-okhttp

Let's first build a OKHTTP client with 

0. a cache
0. an interceptor that checks for connectivity and, if none, asks for cached data:

Here's the client.

    OkHttpClient client = new OkHttpClient
      .Builder()
      .cache(new Cache(App.sApp.getCacheDir(), 10 * 1024 * 1024)) // 10 MB
      .addInterceptor(new Interceptor() {
        @Override public Response intercept(Chain chain) throws IOException {
          Request request = chain.request();
          if (App.isNetworkAvailable()) {
            request = request.newBuilder().header("Cache-Control", "public, max-age=" + 60).build();
          } else {
            request = request.newBuilder().header("Cache-Control", "public, only-if-cached, max-stale=" + 60 * 60 * 24 * 7).build();
          }
          return chain.proceed(request);
        }
      })
      .build();

We first create the cache object with 10 MB, getting the cache directory from a static `Application` context.

Then the `Interceptor` uses a utility method in my `Application` class to check for connectivity. If there is connectivity, we tell the request it can reuse the data for sixty seconds.

If there's no connectivity, we ask to be given only (`only-if-cached`) 'stale' data upto 7 days ago.

Now make this OkHTTP client your client for Retrofit2 and you will be able to use your old cached data when the app goes offline.
