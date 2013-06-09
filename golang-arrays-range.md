Title: Golang: Arrays and range
Tags: golang

Arrays are not used very much in go since they are inflexible compared to the alternative, a slice.

You can define an array by specifying its size in brackets followed by its type. You can make it a literal by using curly brackets afterward.

		var array [10]string
		// Or
		arr := [10]string {"Hello"}

Any unspecified values are given the zero value for the type, a "" in this case.

You can use [...] to make the compile calculate the size for you.

You can use the range operator to iterate through the values.

		for i, v := range arr {
			fmt.Println(i, v)	
		}

Note that the range operator will first return the iteration number and the value.

Arrays are passed by value. The following function will not change the first value of the caller's array.


		...
		arr := [10]string {"Hello"}
		SomeFunction(arr)
		// arr[0] is still "Hello"
		...

		func SomeFunction(arr [10]string) {
			arr[0] = "Not Changed" 
			// This only changes the array local to this function,
			// not the caller's array.
		}

If we had said the parameter was [9]string, for example, the program would not compile. They are different types in go.

(If you had said the type was []string then that would be slice. And you would have to pass a slice, not an array. More on that later)

If you had passsed an array reference and made the parameter an array pointer, then, of course, the value would be changed. But you would not normally do that in golang code.

Instead you use slices.
