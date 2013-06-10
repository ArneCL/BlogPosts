Title: Golang: Slices
Tags: golang, golang-slices

A slice is a data structure with three parts: A pointer to a place in an array, the length of the slice, and the capacity of the array.

A slice type looks like an array, but there is no size defintion:

		var anArray [10]string;
		var aSlice []string;

You can initialise a slice either using a literal, the make function or by using slice syntax:

		slice := []string {"a", "b"}     // Literal. Allocated an underlying array for you
		slice := make([]string, 5, 5)    // Make args: a type or actual array, the length of slice and the optional capacity of slice (defaults to length)
		array := [10]int {1, 2, 3, 4, 5} 
		slice := array[0:len(array)]     // [x:y] is slice syntax

In the slice syntax, the first number after the squared bracket is the index of the array to point to, and the second is the length of the slice -- the whole array in this case.

You can also say [:] to mean the same thing. [:2] to mean the start of the array to the second element. And [2:] to mean from the second element to the rest of the array.

You can append items onto a slice:

		slice := []string {"a", "b"}
		slice = append(slice, "c", "d")

You can copy a slice to another (or two arrays of the same type of size).

		slice1 := []string {"a", "b", "3"}
		slice2 := make([]string, 2)
		copy(slice2, slice1)
		// slice2 now contains "a", "b" -- not "c" since slice2 is not big enough to hold it

You often want to copy since if you pass around a slice of a large file, since the large file will not be garbage collected until all slice references to it disappear.

If you pass around a slice -- as opposed to an array -- the receiving function will be able to change the contents of the underlying array: the slice has a pointer to the underlying array.

You can find the capacity of a slice with the cap function:

		array := [10]int {0, 1, 2, 3, 4, 5, 6, 7, 8, 9}
		slice := make(array, 5, 10)
		fmt.Println(len(slice)) // 5
		fmt.Println(cap(slice)) // 10
		slice = slice[0:cap(slice)]
		fmt.Println(len(slice)) // 10
		fmt.Println(cap(slice)) // 10
