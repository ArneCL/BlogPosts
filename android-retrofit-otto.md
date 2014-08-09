title: Android: Retrofit and Otto
tags: android, android-retrofit, android-otto

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

But we're not passing back the results to the UI thread.

One way to do this is to use an Event Bus, Otto in this case.

The event bus will attach itself to your fragment or activity on onResume and detact it on onPause. This means you won't get result when the activity or fragment is no longer active.

This is how you initialise Otto, in your app's Application class:

        public class Application extends android.app.Application {

            private static Bus sEventBus;
        
            public static Bus getEventBus() {
                if(sEventBus==null) {
                    sEventBus = new com.squareup.otto.Bus();
                }
                return sEventBus;
            }
        
        }

Next in your fragment, say, this is how you subscribe and unsubscribe to events:

        @Override
        public void onPause() {
            super.onAttach(activity);
            Application.getEventBus().unregister(this);
        }
    
        @Override
        public void onResume() {
            super.onResume();
            Application.getEventBus().register(this);
        }

Finally, let's subscribe to two events that we've not yet defined, one for the results and one for an error.

    @Subscribe
    public void onRecentPosts(RecentPostsService.RecentPosts posts) {
        // Do something
    }

    @Subscribe
    public void onRecentPostsError(RecentPostsService.RecentPostsError error) {
        // Do something
    }

We can send the first event, RecentPosts, easily enough. In our onPostExecute() method we can send the event up the event bus:

        ...
        protected void onPostExecute(ReturnType res) {
            if(res!=null) {
                Application.getEventBus().post(res);
            }
        }
        ...
        
Now, when you issue the fetch() call with the service and callback, when the service returns it will send the result up the event bus to your fragment or activity.

Sending an error object is a little tricker. In our call to fetch() we must pass in a generic error object, extended per service, fill it with errors from to Retrofit exception and pass that up the event bus.

With those changes, our class looks like this:

      public class OurRestService<ReturnType, RestService> {
      
        private static final String TAG = OurRestService.class.getSimpleName();
      
        public static abstract class GetResult<ReturnResult, ServiceClass>  {
            public abstract ReturnResult getResult(ServiceClass mService);
        }
    
        public void fetch(
            final RestService service, 
            final GetResult getResult,
            final ErrorResponse errorResponse, 
            ) {
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
                    errorResponse.fill(e.getResponse().getStatus(),
                                       e.getResponse().getReason(),
                                       e.getResponse().getUrl(),
                                       e.isNetworkError());
                      return null;
                  } catch(Exception e) {
                      Log.e(TAG, "Unknown error", e);
                      return null;
                  }
              }
              @Override
              protected void onPostExecute(ReturnType res) {
                if(res!=null) {
                    Application.getEventBus().post(res);
                } else if(errorResponse!=null) {
                    Application.getEventBus().post(errorResponse);
                }
              }
          }.execute();
        }
        
      }
      
Your call to your service is now as follows:

        new OurRestService<RecentPosts, RecentPostsServiceInterface>()
            .fetch(recentPostsServiceInterface,
                   getResultCallback,
                   new ErrorResponseForRecentPosts());
                   
Bonus points if you put the creation of the serviceInterface into the class.

You can also use OkHTTP with retrofit to do transparent response caching and with a bit of work returning things from the cache to provide offline (or before the call) caching.
                   
The code originally appeared in https://github.com/denevell/AndroidQuickstart and a more update to version will soon be in https://github.com/denevell/Natcher.
