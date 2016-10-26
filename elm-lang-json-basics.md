title: Elm-lang: Basics of Json parsing
tags: elm

First `import Json.Decode exposing (..)`. I'm on 4.0.5 of Elm's core library.

`int` is a function parses an Int value. There are similar functions for other json types, `float` for example. These are examples of `Decoder a` types.

You can have more advanced decoders that work upon the above simple decoders.

* `(:=)` takes a string and a decoder type itself. It gets a field, named in the first paramtere, in a json object and applies the decoder on it, to extract that type.
* `list` takes in a decoder itself and looks for a list of items confirming the the decoder type.

Decoders that take decoders allow for embedding: `list ("thing" := int)` says we should find a list of objects, and in those objects there should be a "thing" field which should be an integer.

More advanced decoders are ones that work with objects with multiple fields. `object2` takes in two decoders. It also takes in a function that takes the two decoder values and returns something that combines them.

What's an example of "a function that takes the two decoder values and returns something"? If you have `type alias Hiya = {field1: String, field2: String}` it works as `Hiya "one" "two"` when used as a function. 

So `object2 Hiya ("field1":=string) ("field2":= string)` would decode two string fields and return `Hiya`.

So we're both have simple and complex decoders now. What can we do with them?

`decodeString` will take a decoder such as the ones above and returns a `Result String a`. This returns either an error as a string or the value: a string value in the case of `decodeString`.

For example, given the type `type alias Decoded = {id:Int, company:String}` and the json:

    {
        "companies": [
            {
                "id": 2,
                "name": "Thing"
            },
            {
                "id": 1,
                "name": "Another Thing"
            }
      ]
    }

Then `decodeString ("companies" := list (object2 Decoded ("id":=int) ("name":=string))) theJson` would return you these Elm values wrapped in a `Result`: `Ok ([{ id = 2, company = "Thing" },{ id = 1, company = "Another Thing" }])`

But `Http.get` is probably the main use of this. It takes a `Json.Decoder` and decodes the Json values and returns Elm values according to the decoder passed.

