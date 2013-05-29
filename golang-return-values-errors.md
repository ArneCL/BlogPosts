Title: Golang: Multiple return values and error handling
Tags: golang

A function can return multiple values.

		func Hi() (int, string) {
			return 1, "Hi"
		}

These are retrieved on the caller's side easily enough.

		intValue, stringValue := Hi()

You can ignore a return value by using the underscore.

		_, stringValue := Hi()

You can name your return values for clarify of documentation. (Godoc picks it up too)

		func Hello() (intValue int, stringValue string) {
			intValue = 1
			stringValue = "Hi"
			return intValue, stringValue
		}

Multiple return values help golang programs (and internal libraries) consistently deal with errors (it deals with exception in a separate manner).

		func Hello(input string) (stringValue string, err error) {
			if len(input) == 0 {
				return "", errors.New("Blank strings not accepted.")
			}
			return input + "!", nil
		}

This forces the caller to deal with the error value. 

		stringValue, err := Hello("Hiya")
		if err != nil {
			// Do something, like log.Fatal("You entered a blank string")
		}

Golang forces you to deal with the 'err' value since it fails to compile with unused variables.

Obviously you could use the underscore with 'err'. But then you may as well walk around with a sign saying "My code is not robust" around your neck.
