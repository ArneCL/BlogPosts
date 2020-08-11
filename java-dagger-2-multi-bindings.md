title: Java: Dagger 2 Multibindings
tags: java,java-dagger,android-dagger,android
date: Mon 08 Apr 2019 16:50:18 GMT

This follows on from our previous dagger tutorial:

We can provide dependencies in our `Module` that add to a map of dependencies:

```
    @Provides
    @Named("bands")
    @IntoMap
    @StringKey("favourite")
    public String providesFavouriteBand() {
        return "Half Man Half Biscuit";
    }

    @Provides
    @Named("bands")
    @IntoMap
    @StringKey("secondFavourite")
    public String providesSecondFavouriteBand() {
        return "The Beatles";
    }
```

We're adding two strings, with the keys `favourite` and `secondFavourite`, to a map of strings that is named `bands`.

Later on, we can access this map when we `Inject` dependencies:

```
    @Inject @Named("bands")
    Map<String, String> bands;
```

We can add to this map from different modules. And we can also add to a set too.
