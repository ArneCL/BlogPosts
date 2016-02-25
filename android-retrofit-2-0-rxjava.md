title: Android: Retrofit 2.0 and RxJava
tags: androd,androd-retrofit,android-rxjava

If you want to use all of the above buzzwords your code would look like the below.

Note I'm putting it all in one statement, for some mindless fun, rather than advocating such a practice, unless you *really* want to.

    new Retrofit.Builder()
            .baseUrl("https://api.github.com")
            .addConverterFactory(GsonConverterFactory.create())
            .addCallAdapterFactory(RxJavaCallAdapterFactory.create())
            .build()
            .create(GitHubService.class)
            .listRepos("octocat")
            .subscribeOn(Schedulers.newThread()) // Create a new Thread
            .observeOn(AndroidSchedulers.mainThread()) // Use the UI thread
            .subscribe(new Subscriber<User>() {
              @Override public void onCompleted() { }

              @Override
              public void onError(Throwable e) {
                Log.d("HIYA", "An error!: " + e.getMessage());
              }

              @Override
              public void onNext(User user) {
                Log.d("HIYA", "So we've not got some text: " + user.avatar_url);
              }
            });

So we start by configuring retrofit, with the url, gson converster, RxJava adapter, and finally create and list the call, eventually subscribing to the Observable in a new thread, and observing it in the UI thread.

To ensure we return the an `Observable`, the interface is easy enough:

    public interface GitHubService {
      @GET("users/{user}")
      Observable<User> listRepos(@Path("user") String user);
    }

And the `User` is just a POJO with a public String called `avatar_url`.

Your gradle dependencies should look like this:

    compile 'io.reactivex:rxjava:1.1.1'
    compile 'io.reactivex:rxandroid:1.1.0'
    compile 'com.squareup.retrofit2:retrofit:2.0.0-beta4'
    compile 'com.squareup.retrofit2:converter-gson:2.0.0-beta4'
    compile 'com.squareup.retrofit2:adapter-rxjava:2.0.0-beta'4
