Title: Golang: The lack of deferencing
Tags: golang,golang-pointers

Whether you use a value or a pointer or reference to value, you do not need to deference, as you do in some languages.

Golang will understand that you want to access the value of the pointer, not the pointer itself. 

Say you have this struct.

		type NewType struct {
			name string
		}

Then you make a reference to it with the & operator. You now have a pointer in 'tp'.

		var t NewType 
		tp := &t

You can see below that you can access the attribute of the struct simply with the dot operator - no need to deference.

		tp.name = "Hello"

As below, you can still deference if you want. It's just not needed.

		fmt.Println(tp.name)
		fmt.Println((*tp).name)

The same is true for accessing methods on an interface. 'value.Method()' works the same as 'pointer.Method()'.
