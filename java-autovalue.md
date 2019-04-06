title: Java: Using autovalue
tags: java,java-autovalue

Google's AutoValue helps us create a Java builder, amongst other things.

Let's first include it in our build.gralde:

```
implementation "com.google.auto.value:auto-value-annotations:1.6.1"
annotationProcessor 'com.google.auto.value:auto-value:1.6.1'
```

Then use the `@AutoValue` annotation on our abstract POJO with abstract methods.

And `@AutoValue.Builder` on a static abstract inner class that has abstract setters and a `build` method.

```
@AutoValue
public abstract class SomePOJO {
    public abstract String name();
    public abstract int age();

    @AutoValue.Builder
    public abstract static class Builder {
        public abstract SomePOJO build();
        public abstract Builder name(String name);
        public abstract Builder age(int age);
    }

    public static SomePOJO build() {
        return new AutoValue_SomePOJO.Builder()
                .age(100)
                .name("Dave")
                .build();
    }
}
```

We can then use the generated `AutoValue_SomePOJO` object to use the `Builder` class and methods.

If we pass null into any of the setters, Auto throws an `IllegalStateException` and tells us what we're missing.
