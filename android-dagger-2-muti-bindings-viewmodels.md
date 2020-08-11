title: Android: Dagger 2 multibindings and view model
tags: android,android-viewmodel
date: Mon 08 Apr 2019 18:50:18 GMT

We create a view models like this:

```
SomeViewModel vm = ViewModelProviders.of(this).get(SomeViewModel.class);
``` 

But often we want to give our `ViewModel` dependencies, so we use a factory:

```
public class MyViewModelFactory implements ViewModelProvider.Factory {

    private final Dependency someDependency;

    public MyViewModelFactory(Dependency someDependency) {
        this.someDependency = someDependency;
    }

    @NonNull
    @Override
    public <T extends ViewModel> T create(@NonNull Class<T> modelClass) {
        if(modelClass.isAssignableFrom(SomeViewModel.class)) {
            return (T) new MyViewModel(someDependency);
        }
        throw new IllegalArgumentException("Not found that view model, sunshine.");
    }
}
...

MyViewModelFactory factory = new MyViewModelFactory(someDependency)
SomeViewModel vm = ViewModelProviders.of(factory, this).get(SomeViewModel.class);
```

But we may want to store our `ViewModel`s in Dagger 2's dependecy graph, so we can give the `ViewModel`s dependencies.

So let's change our view model factory so it injects in a map of view models:

```

public class MyViewModelFactory implements ViewModelProvider.Factory {

    private final Map<Class<? extends ViewModel>, ViewModel> mappedViewModels;

    @Inject
    public MyViewModelFactory(Map<Class<? extends ViewModel>, ViewModel> mappedViewModels) {
        this.mappedViewModels = mappedViewModels;
    }

    @NonNull
    @Override
    public <T extends ViewModel> T create(@NonNull Class<T> modelClass) {
        return (T) this.mappedViewModels.get(modelClass);
    }
}
```

Now we need to `@Inject` this `MyViewModelFactory` so it can find its map dependency from the dagger dependency graph:

```
@Inject MyViewModelFactory myViewModelFactory;
...
AndroidSupportInject.inject(this);
...
SomeViewModel vm = ViewModelProviders
        .of(this, myViewModelFactory)
        .get(SomeViewModel.class);
```

So where does Dagger 2 define these `ViewModel`s? It's a Dagger 2 module:

```
@Module
public static class ViewModelsModule {

    @Provides
    @IntoMap
    @ViewModelKey(NewFragmentViewModel.class)
    ViewModel providesNewFragmentViewModel(Dependency dependency) {
        return new NewFragmentViewModel(dependency);
    };
}
```

And we have a `@ViewModelKey` since the provided `@ClassKey` won't differentiate between a normal class and a view model class as a key:

```
@MapKey
public @interface ViewModelKey {
  Class<? extends ViewModel> value();
}
```

And that's that. Is it nice? Not really? Is it how Android developers insist on coding these days? Yes. For the moment anyway.
