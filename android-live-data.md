title: Android: Live Data
tags: android,android-lifecycle

Live data is a way for you to observe changes to data. Let's use it in a `ViewModel`:

```
import android.arch.lifecycle.LiveData;
import android.arch.lifecycle.MutableLiveData;
import android.arch.lifecycle.ViewModel;

public class MyViewModel extends ViewModel {
    public MutableLiveData<String> text = new MutableLiveData<>();

    public LiveData<String> getText() {
        return text;
    }

    public void setText(String text) {
        this.text.setValue(text);
    }
}
```

Instead of having a plain `String` we have a `MutableLiveData` object. And when we want to update data we use `setValue`.


`getText()` returns a `LiveData` object. Let's see how we use that in our activity or fragment:

```
MyViewModel vm = ViewModelProviders.of(this).get(MyViewModel.class);

vm.getText().observe(this, new Observer<String>() {
    @Override
    public void onChanged(@Nullable String s) {
        ((TextView)findViewById(R.id.aTextView)).setText(s);
    }
});
```

We `observe` it. So when it changes we update our view.
