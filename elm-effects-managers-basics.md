title: Elm: The very basic concepts of effect managers in 0.17
tags: elm

Imagine we want use a network time server to retreive the time, and return that to the `update` function in our Elm app. (For the purposes of this explanation, ignore the fact we can use a http call for this.)

First our application has the type `AppType` which is the type that Elm's `update` takes. And `TheTime Int` is a value constructor of that type. The Int parameter should hold the network time when we fetch.

We want to call something like `fetchNetworkTime TheTime`, so the network time module has a function to convert an Int representing the network time to our app defined type.

In the network time module, `fetchNetworkTime fn = NetworkTime fn` would take in a function (i.e. our `TheTime` value constructor) and with such then construct an internal type, `NetworkTime`.

We now have a network time module that has a type, `type NetworkTime msg = NetworkTime (\time -> msg)`, which has a value constructor that allows us to convert from a fetched networked time Int to a type used in our Elm application.

Now imagine after we call `fetchNetworkTime`, Elm intercepted the return value, `NetworkTime`, and sent it to another function in the module.

This other function would extract the function from `NetworkTime`, pass it an Int value fetched from a network time server, grab the resulting `TheTime` value and pass it to something that will route it through to Elm's main `update` method.

This is essentially, and very, very basically, how effects modules in Elm work.

Except the `NetworkTime` type is converted by the compiler, via `...where { command = NetworkTime` }, in the effects module to a `Cmd msg` type, so Elm's `update` function can accepet `Cmd AppType`, thereby hiding all the various different types in the various different effects modules.
