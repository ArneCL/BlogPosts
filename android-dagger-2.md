title: Android: Dagger 2 basic tutorial
tags: android,android-dagger,java,java-dagger
date: Mon 08 Apr 2019 16:50:10 GMT

Say we have this dependency:

```
public interface Ingrediants {
    public List<String> getAll();
}
```

Let's make a module that provides the dependencies in our `MainActivity`:

```
@Module
public class MainActivityModule {

    @Provides
    Ingrediants provideIngredients(){
        return new Ingrediants() {
            @Override
            public List<String> getAll() {
                return Arrays.asList("GIN", "Orange Juice", "Coke");
            }
        };
    }
}
```

And let's include that when Android's injector is used in `MainActivity`:

```
@Module
public abstract class ActivityBuilder {

    @ContributesAndroidInjector(modules = MainActivityModule.class)
    abstract MainActivity bindMainActivity();

}
```

And let's make a component for that:

```
@Component(modules = {AndroidInjectionModule.class, ActivityBuilder.class})
public interface BarComponent {

  void inject(MyApplication myApplication);
}
```

And let's inject that into our `Application`:

```
public class MyApplication extends Application implements HasActivityInjector  {

    @Inject
    DispatchingAndroidInjector<Activity> activityDispatchingAndroidInjector;

    @Override
    public DispatchingAndroidInjector<Activity> activityInjector() {
        return activityDispatchingAndroidInjector;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        DaggerBarComponent.builder()
        .build()
        .inject(this);
    }
}
```

We can now use our MainActivty to `@Inject` a dependency:

```
public class MainActivity extends AppCompatActivity {

    @Inject
    Drink drink;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        AndroidInjection.inject(this);
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        drink.taste();
    }

}
```

And what is `Drink`? We'll it's a class that gets its dependency from our `DrinkModule` by the `Component`:

```
public class Drink {

    @Inject
    public Drink() {}

    @Inject
    Ingrediants ingrediants;

    public void taste() {
        Log.d("HI", "Our drink contains: " + ingrediants.getAll());
    }
}
```
