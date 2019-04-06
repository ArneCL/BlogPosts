title: Android: View models
tags: android, android-lifecycle

Android will save the state of a simple POJO between rotations if you use something called a View Model.

Let's first import it in our gradle file:

```
implementation "android.arch.lifecycle:extensions:1.1.0"
implementation "android.arch.lifecycle:viewmodel:1.1.0"
```

Then create a POJO that extends `ViewModel`:

```
import android.arch.lifecycle.ViewModel;

public class MyViewModel extends ViewModel {
    public String text = "";

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
```

And then in our activity, you can initalise it:

```
MyViewModel vm = ViewModelProviders.of(activityOrFragment).get(MyViewModel.class);
```

Now anything you save in that POJO will be retained until the activity is destroyed.

We can't pass the POJOs constructors arguments, however. But you can give `ViewModelProviders.of` second `factory` argument.

```
MyViewModelFactory factory = new MyViewModelFactory("Develop");
final MyViewModel vm = ViewModelProviders.of(this, factory).get(MyViewModel.class);
```

This factory is responsible for creating the view models. And we can pass that a constructor argument. And we use that to give the view model a constructor argument:

```
public class MyViewModelFactory implements ViewModelProvider.Factory {

    private final String appVersion;

    public MyViewModelFactory(String appVersion) {
        this.appVersion = appVersion;
    }

    @NonNull
    @Override
    public <T extends ViewModel> T create(@NonNull Class<T> modelClass) {
        if(modelClass.isAssignableFrom(MyViewModel.class)) {
            return (T) new MyViewModel(appVersion);
        }
        throw new IllegalArgumentException("Not found that view model, sunshine.");
    }
}
```
