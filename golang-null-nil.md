Title: Golang: Understanding 'null' and nil 
Tags: golang, golang-nil

Golang does not allow NULL, or its version nil, where some languages do.

		package main
		import "fmt"

		func main() {
			someRandom := getString()
			fmt.Println(someRandom)
		}

		func getString() string {
			return nil // This WON'T compile
		}

Because the return of getString is a **value** (and a struct is a value too, incidentally), it cannot be nil. 

This allows us to avoid many NULL pointer errors in other languages.

A 'NULL' pointer error is still possible, however. But only with actual **pointers or references** (a slice is a common example).

		package main
		import "fmt"

		type SomeStruct struct {
			name string
		}

		func main() {
			s := getSomeStruct()
			fmt.Println(s.name) // It will crash here
		}

		func getSomeStruct() *SomeStruct {
			return nil // This WILL compile
		}

In this case, since getSomeStruct() returns a pointer, we can return nil. 

And as such if we try to reference the 'name' attribute of the struct we will crash.
