Title: Golang: Constants, enums and iota
Tags: golang

You can type or untype your constants. And untyped constant can be used in any expression and converted implicitly:

		const thing = 5 // untyped
		const thing2 int = 5 // typed - only used in int expressions

Enums come by putting a bunch of consts in parens:

		const ( 
			One = 1
			Two = 2
			Three = 4
		)

You can use iota to create these values. Within a const group, it starts at 1, and then increments for each expression.

		const ( 
			One = 1 << iota // 1 (i.e. 1 << 1)
			Two // 2 (i.e. 1 << 2)
			Three // 4 (i.e 1 << 3)
		)

If you print a Two, for example, it will display 2.

You can 1) Give the enum a custom type and 2) give the custom type a String() method to change that:

Giving custom types methods is the OOP of golang. And will be discussed in later posts.

		type Type int

		const ( 
			One Type = 1 << iota // 1
			Two Type // 2 (i.e. 1 << 2)
			Three Type // 4 (i.e 1 << 3)
		)

		func (t Type) String() string {
			s:=""
			if t&One==One {
				s+="One"
			}
			...
			return s
		}

Now if you print the 'One' type it will out the text "One".
