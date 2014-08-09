title: Android: Retrofit and OkHttp
tags: android, android-retrofit

You can use Square's Refrofit library, Square's event bus Otto, along with Google's Json converter Gson, can ease your REST calls.

First start off with an interface that has some Retrofit annotations specifying the service:

    public static interface RecentPostsServiceInterface {
        @GET("/post/{start}/{num}")
        RecentPosts go(@Path("start") int start, @Path("num") int num);
    }
    
Then create a RestAdapter, specifying the end point, the Gson converter and using our interface:

    RestAdapter restAdapter = new RestAdapter.Builder()
            .setEndpoint("https://android-manchester.co.uk/api/rest")
            .setConverter(new GsonConverter(new Gson()))
            .build();
    RecentPostsServiceInterface service = restAdapter.create(RecentPostsServiceInterface.class);

You can then call the following to get your result:

    RecentPosts recentPosts = service.go(start, num);
    
You should really put this in a AsyncTask:

  public class OurRestService {
  
      private static final String TAG = OurRestService.class.getSimpleName();

      public void fetch(
          final RecentPostsServiceInterface service, 
          final int start, 
          final int num) {
        new AsyncTask<Void, Void, RecentPosts>() {
            @Override
            protected ReturnResult doInBackground(Void... params) {
                try {
                    Log.d(TAG, "Attempting to fetch result from base url: " + endPoint);
                    RecentPosts res = service.go(start, num);
                    if(res!=null) {
                        Log.d(TAG, "Fetched : " + res.toString() + " from " + endPoint);
                    }
                    return res;
                } catch (RetrofitError retroError) {
                    // TODO
                    return null;
                } catch(Exception e) {
                    Log.e(TAG, "Unknown error", e);
                    return null;
                }
            }
            @Override
            protected void onPostExecute(RecentPosts res) {
                // TODO
            }
        }.execute();
      }
  }
    
One problem with this code is that it isn't very generic - and we suspect we'll be making lots of networking calls.

First let's make the service return type generic:

  public class OurRestService<ReturnType> {
  
    private static final String TAG = OurRestService.class.getSimpleName();

    public void fetch(
        final RecentPostsServiceInterface service, 
        final int start, 
        final int num) {
      new AsyncTask<Void, Void, ReturnType>() {
          @Override
          protected ReturnResult doInBackground(Void... params) {
              try {
                  Log.d(TAG, "Attempting to fetch result from base url: " + endPoint);
                  ReturnType res = service.go(start, num);
                  if(res!=null) {
                      Log.d(TAG, "Fetched : " + res.toString() + " from " + endPoint);
                  }
                  return res;
              } catch (RetrofitError retroError) {
                  // TODO
                  return null;
              } catch(Exception e) {
                  Log.e(TAG, "Unknown error", e);
                  return null;
              }
          }
          @Override
          protected void onPostExecute(ReturnType res) {
              // TODO
          }
      }.execute();
    }
    
  }
  
Next, since in our all we'll be passing all kinds of arguments to our rest services, we need to stop passing the start and num parameters.

Instead, we'll pass a callback, which will take in the service, and return the return type.

This means, therefore, the Retrofit service should be made generic, since we'll be passing that into the callback.

We'll create the callback as such:

  public interface class GetResult<ReturnType, ServiceClass>  {
      ReturnType getResult(ServiceClass service);
  }
  
  In the implementation for this method, where we have access to start and num, we'd pass the parameters to the service and return it's result.
  
  new GetResult<RecentPosts, RecentPostsServiceInterface>() {
      @Override public RecentPosts getResult(RecentPostsServiceInterface service) {
          return service.go(start, num);
      }
  }

Now our service is generic  

  public class OurRestService<ReturnType, RestService> {
  
    private static final String TAG = OurRestService.class.getSimpleName();
  
    public static abstract class GetResult<ReturnResult, ServiceClass>  {
        public abstract ReturnResult getResult(ServiceClass mService);
    }

    public void fetch(
        final RestService service, 
        final GetResult getResult) {
      new AsyncTask<Void, Void, ReturnType>() {
          @Override
          protected ReturnResult doInBackground(Void... params) {
              try {
                  Log.d(TAG, "Attempting to fetch result from base url: " + endPoint);
                  ReturnType res = getResult.go(service);
                  if(res!=null) {
                      Log.d(TAG, "Fetched : " + res.toString() + " from " + endPoint);
                  }
                  return res;
              } catch (RetrofitError retroError) {
                  // TODO
                  return null;
              } catch(Exception e) {
                  Log.e(TAG, "Unknown error", e);
                  return null;
              }
          }
          @Override
          protected void onPostExecute(ReturnType res) {
              // TODO
          }
      }.execute();
    }
    
  }
