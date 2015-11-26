title: PolymerJS: Using behaviors
tags: polymer, polymer-behaviors

Behaviours are simple enough to define:

    <script>
        SomeThing  = {
            yo: function(yo) {
                console.log(yo+"!!!");
            },  
        }
    </script>

The above can have a `properties` object or various callbacks, just like a normal `Polymer` definition.

Then in the actual Polymer element, do something like:

    Polymer({
        is: "some-thing",
        behaviors: [SomeThing],
    ...

Now you can share that `behavior` among multiple custom elements should you wish.
