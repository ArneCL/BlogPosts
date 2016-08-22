title: Jersey: Custom bean validation / ConstraintViolationException
tags: jersey,bean-validation,scala

With [bean validation in Jersey](https://newfivefour.com/jersey-bean-validation-json.html), you get JSON errors like this:

    [
      {
        "message":"may not be null",
        "messageTemplate":"{javax.validation.constraints.NotNull.message}",
        "path":"Hello.register.arg0.email",
        "invalidValue":null
      }
    ]

That's great, but sometimes you have errors that appear after bean validation, such as when someone tries to register as an existing user.

You will only know about this when you talk to your data stores of existing users.

It would be nice to keep the above error format, but talk about more general errors. You do this by creating a custom `ConstraintViolation` and throwing a `ConstraintViolationException`.

The `ConstraintViolationException` takes a HashSet of `ConstraintViolation`. Let's create a dummy `ConstraintViolation` in Scala (the Java version is obviously just about the same):

    new ConstraintViolation[Object] {
      def getConstraintDescriptor(): ConstraintDescriptor[_] = null
      def getExecutableParameters(): Array[Object] = null
      def getExecutableReturnValue(): Object = null
      def getInvalidValue(): Object = "The invalid valid"
      def getLeafBean(): Object = null
      def getMessage(): String = "Something went wrong"
      def getMessageTemplate(): String = ""
      def getPropertyPath(): javax.validation.Path = new MyPropertyPath(argPath)
      def getRootBean(): Object = obj
      def getRootBeanClass(): Class[Object] = classOf[Object]
      def unwrap[U](t: Class[U]): U = t.newInstance
    }

Most of the values above are empty, except for `getInvalidValue`, `getMessage`, `getPropertyPath`, `getRootBean` and `getRootBeanClass`

`getInvalidValue` displays the invalid value in the JSON above. `getMessage` displays the messages. `getPropertyPath` helps display path above: it's just a dumy object with an dumy iterator and we use its `toString` method to fill out the rest of the `"path"`

The `getRootBean` gives us the name at the start of the `"path"` json reply. `getRootBeanClass` and `unwrap` need to be non-null but don't seem to affect the JSON output.

We need to define the `iterator()` method, but we can make it a dummy one, as above. 

The `toString` method will actually give us the output string seen in `"path"` in the JSON object, just after the class name for the object found via `ConstraintViolation`'s `getRootBean` method. 

Let's put this altogether:

    // Dumpy Path object: we only want its "toString"
    class MyPropertyPath(var pathName: String) extends javax.validation.Path {
      def iterator():java.util.Iterator[javax.validation.Path.Node] = {
        return new java.util.Iterator[javax.validation.Path.Node] {
          def hasNext(): Boolean = false
          def next(): javax.validation.Path.Node = null
        }
      }
      override def toString:String = pathName
    }
    
    def customValidationErrorMessage(obj: Object, argPath: String, message: String, invalid: Object) = {
      var hs = new HashSet[ConstraintViolation[_]]
      hs.add(new ConstraintViolation[Object] {
        def getConstraintDescriptor(): ConstraintDescriptor[_] = null
        def getExecutableParameters(): Array[Object] = null
        def getExecutableReturnValue(): Object = null
        def getInvalidValue(): Object = invalid
        def getLeafBean(): Object = null
        def getMessage(): String = message
        def getMessageTemplate(): String = ""
        def getPropertyPath(): javax.validation.Path = new P(argPath)
        def getRootBean(): Object = obj
        def getRootBeanClass(): Class[Object] = classOf[Object]
        def unwrap[U](t: Class[U]): U = t.newInstance
      })
      throw new ConstraintViolationException("", hs)
    }

If we call `customValidationErrorMessage(register, "username", "Duplicate user", "dave")` in a Jersey method, we'll get this returned:

    [
      {
        "message":"Duplicate user",
        "messageTemplate":"",
        "path":"RegisterUser.username",
        "invalidValue":"dave"
      }
    ]

Voila!
