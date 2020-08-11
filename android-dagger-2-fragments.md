title: Android: Dagger 2 and fragments
tags: android,android-dagger 
date: Mon 08 Apr 2019 16:59:18 GMT

We've already got Dagger 2 setup in the Activity:

Let's say you now want to alter `MainActivity` to start a new Fragment:

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

        getSupportFragmentManager().beginTransaction()
                .add(R.id.container, new NewFragment(), "TAG")
                .commit();
    }
}
```

And you want the Fragment to resolve its dependencies from Dagger too:

```
public class NewFragment extends Fragment {

    @Inject
    Drink anotherDrink;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        AndroidSupportInjection.inject(this);
        return LayoutInflater.from(getContext()).inflate(R.layout.frag, null);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        androidDrink.taste();
    }
}
```

You have a problem since Dagger doesn't know about this Fragment. You must update your `MainActivityModule` to include it to your android injector:

```
@Module(includes = MainActivityModule.FragmentsModule.class)
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

    @Module
    public static abstract class FragmentsModule {

        @ContributesAndroidInjector
        abstract NewFragment bindNewFragment();
    }
}
```

(Note the `includes` part and the new module that's telling the Android Injector about our new Fragment`)

But we must do more. We must alter `MainActivity` to give a fragment injector:

```
public class MainActivity extends AppCompatActivity implements HasSupportFragmentInjector {

    @Inject
    public DispatchingAndroidInjector<Fragment> dispatchingAnroidInjector;

    @Inject
    Drink drink;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        AndroidInjection.inject(this);
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        drink.taste();

        getSupportFragmentManager().beginTransaction()
                .add(R.id.container, new NewFragment(), "TAG")
                .commit();
    }

    @Override
    public AndroidInjector<Fragment> supportFragmentInjector() {
        return dispatchingAnroidInjector;
    }
}
``` 

And now everything works.
