title: Android and Facebook's Litho: Getting started
tags: android,litho

Litho allows you to declare your view in code with speed optimisations for lists.

It uses flexbox layout logic, via the Facebook Yoga library, allowing you to use your existing web knowledge. This applies to iOS too since Yoga also exists for iOS.

It supports one-directional data binding, thereby allowing you dive into the flux architecture a little.

Let's do the basic getting started first. Let's bung all the depenedencies into your app's `build.gradle`.

```
compile 'com.facebook.litho:litho-core:0.2.0'
compile 'com.facebook.litho:litho-widget:0.2.0'
provided 'com.facebook.litho:litho-annotations:0.2.0'
annotationProcessor 'com.facebook.litho:litho-processor:0.2.0'
compile 'com.facebook.soloader:soloader:0.2.0'
debugCompile 'com.facebook.litho:litho-stetho:0.2.0'
compile 'com.facebook.litho:litho-fresco:0.2.0'
```

Create an `Application` class in your app and ensure your manifest points to it. In the `onCreate` method add this:

```
SoLoader.init(this, false);
```

In your Activity's `onCreate` change the view layout code to:

```
 ComponentContext c = new ComponentContext(this);
 setContentView(LithoView.create(c, MyComponent.create(c).build()));
```

We're creating a Litho context, and then creating a Litho view with that context, and a component too. Where does that `MyComponent` come from?

```
@LayoutSpec
public class MyComponentSpec {
    @OnCreateLayout
    static ComponentLayout onCreateLayout(ComponentContext c) {
        return Column.create(c)
                .paddingDip(YogaEdge.ALL, 16)
                .child(Text.create(c)
                        .text("sup")
                        .textSizeSp(40))
                .child(Text.create(c)
                        .text("sup2")
                        .textSizeSp(20))
                .build();

    }
}
```

The annoation `@LayoutSpec` takes the class name minus `Spec`, thereby creating the `MyComponent` class via facebook's annoation processor.

We create a `Column` using flexbox terminology, with two `Text` children, which are not TextViews incidentally.

Later tutorials will focus on using Android Views within Litho and events I should think.
