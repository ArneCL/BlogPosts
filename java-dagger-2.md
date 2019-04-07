title: Java and Android: Dagger 2 introduction (including Component.Builder)
tags: java,dagger

Let's work through an example of Dagger 2. I'm doing it this in an Android project but for simplicity we'll be treating the project like a normal Java project for the most part: there will be no Activity or Fragment specific code. First this this in our gradle.build file:

```
annotationProcessor 'com.google.dagger:dagger-compiler:2.20'
implementation 'com.google.dagger:dagger:2.20'
```

We have a `Drink` class. This has a `taste` method. The `taste` method prints out the ingredients in the drink. The `Ingredients` are held as a instance method in the class. Normally we would pass the ingredients in a constructor parameters. But instead we use the `@Inject` annotation on a member field. Later Dagger will inject an implmentation of `Ingredient`s here. (We must also annotate `Drink` with `@Inject` to keep Dagger happy when creating `Drink`.)

```
public class Drink {

    public static interface Ingredients {
        List<String> getAll();
    }

    @Inject
    public Drink() {}

    @Inject
    Ingrediants ingredients;

    public void taste() {
        System.out.println("Our drink contains: " + ingredients.getAll());
    }
}
```

We now use a Dagger `Module` to define our dependencies. In our case, our dependency is `Ingredient`. We make a plain class and annotate it with `@Module`. In that class we have a method that's annotated with `@Provides` and that method returns our `Ingredient`s. The name of method could actually be anything - the only thing that matters is the return type.

(Note: we are explicity detailing our ingredients implementation in the module. Later we'll learn how to do this in a more dynamic way)

We must have a `Component` class. This let's us begin our dependency injection. You need to create an interface. And this is annotated with `@Component`. And the parameters to that annotation is our `Module` that we created above. Inside our component we have an `inject` method. The paramter is the type of class which we will use our dependency injection.

```
@Component(modules = DrinkModule.class)
interface BarComponent {

  void inject(MainActivity activity);

  @Module
  public class DrinkModule {

    @Provides public Ingredients providesIngredients() {
      return new Ingrediants() {
          @Override
          public List<String> getAll() {
              return Arrays.asList("GIN", "Orange Juice", "Coke");
          }
      };
    }
  }
}
```

We've made our module with the dependencies that lives inside our component. So we can now use the component. Dagger automatically creates a class `DaggerBarComponent` that's based on our `BarComponent` class. We then call the `builder()` method that returns a builer. We're not currently doing anything special so we call 'build()'. And we've built our component, we call the inject method -- passing in our current class.

At the point, any instance methods in the current class that have the `@Inject` annotation will be initiated by Dagger. And importantly its dependency's will be resolved. For instance, we have `@Inject Drink drink` and Dagger will create `Drink`, look at all the instance methods, for example, `@Inject Ingredients ingredient`, and resolve those using Dagger's component and module.

```
@Inject Drink drink;
...
DaggerBarComponent
  .builder()
  .inject(this);
...
drink.taste()
```

We previously hard-coded our Ingredients `"GIN", "Orange Juice" and "Coke"` in our module. We can instead pass those into our component. We do this using a dagger factory. We do this using an interface annnotated with `@Component.Builder`. We have a method that returns that interface. It also has an argument of, in our case, `List<String> ingredeients`. We must have an extra method called build that returns the component. The second thing we do is alter the `providesIngredients` method in our module. This method now takes in the `List<String> ingredients` and uses it.

```
@Component(modules = { BarComponent.DrinkModule.class })
interface BarComponent {

    @Component.Builder
    interface Builder {
        @BindsInstance Builder ingredients(List<String> ingredients);
        BarComponent build();
    }

    void inject(MainActivity activity);

    @Module
    class DrinkModule {

        @Provides
        public Drink.Ingredients providesIngredients(final List<String> ingredients) {
            return new Drink.Ingredients() {
                @Override
                public List<String> getAll() {
                    return ingredients;
                }
            };
        }

    }
}
```

Now when we build our module we can pass in the `List<String> ingredients`:

```
DaggerBarComponent
  .builder()
  .ingredients(Arrays.asList("Vodka", "Rum", "Coke"))
  .build()
  .inject(this);
```

You can also then use Android's build types to swap in or out the depedencies depending on the build type:

```
List<String> ingredients = null;
if(BuildConfig.BUILD_TYPE.equals("teeTotal")) {
    ingredients = Arrays.asList("Orange", "Soda", "Pineapple");
} else if(BuildConfig.BUILD_TYPE.equals("alcoholic")) {
    ingredients = Arrays.asList("Vodka", "Rum", "Coke");
}

DaggerBarComponent
  .builder()
  .ingredients(ingredients)
  .build()
  .inject(this);

drink.taste();
```

By specifying two build types in your app/build.gradle file:

```
...
android {
  ...
    buildTypes {
      ..
      teeTotal {
        initWith debug
      }
      alcoholic {
        initWith debug
      }
    }
  ...
}
...
```

And then using `adb` to either `./gradlew installAlcoholic` or `./gradlew installTeeTotal`. And then you can see the different output in logcat.
