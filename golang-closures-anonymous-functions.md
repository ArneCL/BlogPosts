Title: Golang: Anonymous functions, function passing and closures
Tags: golang

Golang can pass functions to other functions.

This anonymous function takes in a string and returns a string. It is passed to another function.

		anon := func(s name) string {
			return "Hiya, " + name
		}
		anotherFunction(anon)

The other function looks like this. Note it defines the function signature it will accept

		func anotherFunction(f func(string) string) {
			result := f("David")
			fmt.Println(result) // Prints "Hiya, David"
		}

You can make the anonymous function **close over** a value, making it a closure. 

Say the first anonymous function was like this.

		valueToCloseOver := "My name is HAL."
		anon := func(s name) string {
			return "Hiya, " + name + ". " + valueToCloseOver
		}
		anotherFunction(anon)

Regardless of where the anonymous function is passed to, it will always have access to 'valueToCloseOver'.

This example is trivial. But passing logic and state around is a powerful coding mechanism.
