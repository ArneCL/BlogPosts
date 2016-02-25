title: Android and Retrofit 2.0
tags:android,android-retrofit

Now Retrofit is at 2.0, there are a few basic changes to the usual approach. Here's the interface which is as before:

    public interface GitHubService {
      @GET("users/{user}")
      Call<User> listRepos(@Path("user") String user);
    }

And here's the basic builder to create the service:

    final GitHubService service = new Retrofit.Builder()
            .baseUrl("https://api.github.com")
            .addConverterFactory(GsonConverterFactory.create())
            .build()
            .create(GitHubService.class);

But to get this we must now explictly include our Gson dependency in our gradle file:

    compile 'com.squareup.retrofit2:retrofit:2.0.0-beta4'
    compile 'com.squareup.retrofit2:converter-gson:2.0.0-beta4'

And finally we call the repo and it returns a `Call`, and we call the `enqueue` method on that to get the data asynchronously. 

    Call<User> repos = service.listRepos("octocat");

    repos.enqueue(new Callback<User>() {
      @Override
      public void onResponse(Call<User> call, Response<User> response) {
        User body = response.body(); // Body could be null if parse error
        Log.d("HIYA", "good " + body.avatar_url);
      }

      @Override
      public void onFailure(Call<User> call, Throwable t) {
        Log.d("HIYA", "error " + t.getMessage());
      }
    });

The good thing about the new `Call` architecture if that we can check the headers and such on a valid response.

Our data object is as simple as ever:

    private static class User {
      public String avatar_url;
    }
