Title: Golang: Types and the struct type
Tags: golang

The 'type' keywords sets a new name for a type in your system. The new type will be a different name for one of golang's internal types, 'string' for example.

		type NewType string

Now you can say

		var someVar NewType
		someVar = "Hello"
		fmt.Println(someVar)

It gets interesting when you use a struct type. This is simply aggregate of other types.

		type NewType struct {
			age int
			name string
		}

You access the fields using the dot operator.

		var someVar NewType
		someVar.name = "Jim"
		fmt.Println(someVar.name)
