title: Elm-lang: Create a new component
tags: elm

Let's create a component named `Component.elm`. It is very similar to your main program. It can have a `Msg` union type, `update`, `view` and `init` functions. It can have its own commands and subscriptions. 

Here's a very simple version without its own model for demonstrative purposes.

    module Component exposing (..)
    
    import ...
    
    type Msg  = YesPressed | NoPressed
    
    update : Msg -> Cmd Msg
    update msg = 
      case msg of 
        YesPressed -> Cmd.none
        NoPressed -> Cmd.none
    
    view : Html Msg
    view = 
      div [] [
        button [ onClick YesPressed ] [ text "yes" ]
        , button [ onClick NoPressed ] [ text "no" ]
      ]

It displays two buttons, which send local messages, which in turn do nothing. 

Let's hook it up to our main program. In our main program's `Msg` union type add in our component's union type:

    import Component exposing (..)

    type Msg =
      ComponentMsg Component.Msg
      ..

Our main app's view will create messages of the type `ComponentMsg` by calling our component's view function:

    view : Model -> Html Msg
    view model =
      div []
          [
          Html.App.map ComponentMsg (Component.view)
          ...
          ]

We're using `Html.App.map` to map our component's view type, `Component.Msg`, to our main app's type, `Msg`.

Now when we press the yes or no button, it will send out a `ComponentMsg`. Let's deal with that now.

This means in our main program's `update` function:

    update : Msg -> Model -> ( Model, Cmd Msg )
    update msg model =
      case msg of
        ComponentMsg m -> case m of 
                            YesPressed -> ( model, ... )
                            NoPressed -> ( model, ... )
        ...

When we receive a `ComponentMsg` via the view above, we case over the `Component.Msg` values and act accordingly.

We haven't called the component's `update` function. This is mainly because it does nothing: it neither returns a model or an interesting command.

If it did, and it had its own model and the `update` method took that in,  we could capture those using

      case msg of
        ComponentMsg m -> let ( componentModel, componentCmd ) = Component.update model.component
                          in case m of 
                            ...

The `model.component` would be available via `type alias Model = { component: Component.Model, ... }` which our component's `update` function would update and return.

The `componentCmd` would be of the type `Cmd Component.Msg`. To map it to our application's `Cmd Msg`, use `Cmd.map ComponentMsg componentCmd`.

You could then return that and its `Cmd` would be executed and returned back to the main app's `update` as the `ComponentMsg` type.

I'm using 0.17.1.
