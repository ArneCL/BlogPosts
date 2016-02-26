title: Android, RxJava and Retrofit: Wait for multiple network calls to finish
tags: android,android-rxjava,android-retrofit

Say you have multiple network calls you need to make--cals to get Github user information and Github user events for example.

And you want to wait for each to return before updating the UI. RxJava can help you here.

Let's first define our Retrofit object to access Github's API, then setup two observables for the two network requests above:

    Retrofit repo = new Retrofit.Builder()
            .baseUrl("https://api.github.com")
            .addConverterFactory(GsonConverterFactory.create())
            .addCallAdapterFactory(RxJavaCallAdapterFactory.create())
            .build();

    Observable<JsonObject> userObservable = repo
            .create(GitHubUser.class)
            .getUser(loginName)
            .subscribeOn(Schedulers.newThread())
            .observeOn(AndroidSchedulers.mainThread());

    Observable<JsonArray> eventsObservable = repo
            .create(GitHubEvents.class)
            .listEvents(loginName)
            .subscribeOn(Schedulers.newThread())
            .observeOn(AndroidSchedulers.mainThread());

The Retrofit interfaces are simple enough:

    public interface GitHubUser {
      @GET("users/{user}")
      Observable<JsonObject> getUser(@Path("user") String user);
    }
    
    public interface GitHubEvents {
      @GET("users/{user}/events")
      Observable<JsonArray> listEvents(@Path("user") String user);
    }

Lately we use RxJava's `zip` method to combine our two Observables and wait for them to complete before creating a new Observable. 

    Observable<UserAndEvents> combined = Observable.zip(userObservable, eventsObservable, new Func2<JsonObject, JsonArray, UserAndEvents>() {
      @Override
      public UserAndEvents call(JsonObject jsonObject, JsonArray jsonElements) {
        return new UserAndEvents(jsonObject, jsonElements);
      }
    });

What's the `UserAndEvents`? It's just a simple POJO to combine the two objects:

    public class UserAndEvents {
      public UserAndEvents(JsonObject user, JsonArray events) {
        this.events = events;
        this.user = user;
      }
  
      public JsonArray events;
      public JsonObject user;
    }

Finally let's call the subscribe method on our new combined Observable:

    combined.subscribe(new Subscriber<UserAndEvents>() {
              ...
              @Override
              public void onNext(UserAndEvents o) {
                // You can access the results of the 
                // two observabes via the POJO now
              }
            });

No more waiting in threads etc for network calls to finish. RxJava has done all that for you in `zip()`.
