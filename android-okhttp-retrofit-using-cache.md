title: Android: Using OkHTTP's response cache (Retrofit)
tags: android, android-retrofit, android-okhttp

If you're using Refrofit with OkHTTP, or just OkHTTP on its own, you can set it up to cache your responses.

This is an example in OkHTTP 2.0.

    OkHttpClient http_client = new OkHttpClient();
    try {
        Cache responseCache = new Cache(context.getCacheDir(), SIZE_OF_CACHE);
        http_client.setCache(responseCache);
    } catch (Exception e) {
        Log.d(TAG, "Unable to set http cache", e);
    }
    http_client.setReadTimeout(30, TimeUnit.SECONDS);
    http_client.setConnectTimeout(30, TimeUnit.SECONDS);
    return new OkClient(http_client);

If you cache is large enough, OkHTTP will start to cache your responses. And if your server uses Etags or similar, it will returned cached responses on 304s.

You can also access this cache to return cached responses before making a network response.

    public FilterInputStream getFromCache(String url) throws Exception {
        DiskLruCache cache = DiskLruCache.open(context.getCacheDir(), 201105, 2, SIZE_OF_CACHE);    
        cache.flush();
        String key = Util.hash(url);
        final DiskLruCache.Snapshot snapshot;
        try {
            snapshot = cache.get(key);
            if (snapshot == null) {
                return null;
            }
        } catch (IOException e) {
            return null;
        }

        FilterInputStream bodyIn = new FilterInputStream(snapshot.getInputStream(1)) {
            @Override
            public void close() throws IOException {
                snapshot.close();
                super.close();
            }
        };

        return bodyIn;
    }
    
This opens the DiskLruCache that OkHTTP uses internally, makes a hash out of your URL using an OkHTTP utility method, then returns the cache as a InputStream.

You must pass this the full URL used to make the request, including the query paramters, or the hashing won't match the saved response.

The arguments to DiskLriCache.open() must match those used internally by OkHTTP, those used by the com.squareup.okhttp.Cache.java when you issued new Cache(context.getCacheDir(), SIZE_OF_CACHE). Accordingly, when you update OkHTTP this may break - warning!

Now you must convert the InputStream to your response object:

    Scanner sc = new Scanner(filterInputStream);
    String str="", s;
    while(sc.hasNext() && (s=sc.nextLine())!=null) {
        str = str + s;
    }
    ReturnType recentPosts = new Gson().fromJson(str, returnType);

The ReturnType is the type of the response, a POJO used to deserialise the JSON in this case.
