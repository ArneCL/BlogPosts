title: Elm-lang: Basics of native modules
tags: elm

A native module is one that communicates with javascript. And it communicates with events, success and failure events. I'm using 0.17.

In our normal Elm code, import our yet to be created native module, create our function that calls the javascript function and create three union types that will receive the success, receive the failure and request the function be called:

    import Native.MyModule -- this can't be aliased, etc

    addOne : Int -> Task Int Int
    addOne = Native.MyModule.addOne 

    type Msg = ...
      | GoodNative Int | BadNative Int | SendNative

Native modules are prefixed with `Native` and will live in our Native source directory, and our module will be called `MyModule`. The two union types with constructor values will receive the results (an Int - and we'll also get one on failure).

The function itself is in 'points free' style. It takes no parameters, but we'll still call it via `addOne 807`. It will return a `Task` which we will later perform which will turn it into a `Cmd Msg` to be returned in our `update` Elm function.

Now in our update function, we'll call our `addOne` function when we receive the `SendNative` event (in a onClick call for example). The result of this is a `Task`, as we see above, which we will perform with our failure and success union type value constructors.

    update : Msg -> Model -> ( Model, Cmd Msg )
    update msg model =
      case msg of
        SendNative     -> ( model, addOne 807 |> Task.perform BadNative GoodNative )
        GoodNative i   -> ( { model | num = i }, Cmd.none )
        BadNative i    -> ( model, Cmd.none )
        ...
    
The final two value constructors take the Int values we'll receive and use it somehow, in the view via the model normally. That's all for our Elm code.
 
Let's create a `Native` directory in our source file and create a file called `MyModule.js`. And in our `elm-package.json` ensure you have `"native-modules": true`. And in our javascript file:

    var _user$project$Native_MyModule = function() {

      ...

      return {
        addOne: addOne
      };

    }();
 
The variable `_user$project$` appears define the module for our local project. After that we have `Native_MyModule`, which relates to our `import Native.MyModule` import in our Elm code. We return an object that has a key naming our function, `addOne` and it has a value of a function that we'll look at now:

    function addOne(num) {
      return _elm_lang$core$Native_Scheduler.nativeBinding(function(callback) {
        callback(_elm_lang$core$Native_Scheduler.succeed(num+1));
      })
    }

It takes in a single variable and returns `_elm_lang$core$Native_Scheduler`, which relates to a javascript file you can find in your packages directory. We call `nativeBinding` function and pass in a function that takes a callback as a parameter.

Within that function, we use the callback, again using the scheduler, but this time call `succeed`, which the parameter plus one. This will finally relate to the `GoodNative` type in your elm code, with the attached integer variable. 

In the same way, you could also use `_elm_lang$core$Native_Scheduler.fail(someValue)` which would then invoke `BadNative` 
