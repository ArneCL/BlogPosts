title: Scala: Bypassing "Ambiguous reference to overloaded definition" errors with reflection
tags: scala

Sometimes you'll see something like this error, especially with var args methods, or methods with the Any type

    Error:(41) ambiguous reference to overloaded definition,
    both method someMethod in class SomeClass of type (x$1: String, etc)Unit
    and  method someMethod in class SomeClass of type (x$1: String, etc)Unit
    match argument types (String)

This means scala can't differentiate between two methods.

[This stackoverflow thread](https://stackoverflow.com/questions/16829114/ambiguous-reference-to-overloaded-definition-one-vs-two-parameters) talks about it some more. And [this scala bug report](https://issues.scala-lang.org/browse/SI-4728) is working on it.

It's not ideal, and it's slower than direct calls, but you can use Java's reflection to outcome this, while you wait for the Scala fix:

      classOf[SomeClass].getMethod("someMethod", classOf[String]).invoke(this, "Some arg")

This way you explicitly define the method, specifying its parameters, that you want to call.
