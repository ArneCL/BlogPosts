Title: Golang: Testing
Tags: golang,golang-testing

Say you have a source file like so in hello.go:

		package somepackage 

		func Thing(str string) string {
			return "hello " + str
		}

Then you can issue tests for it by creating a hello_test.go in the same directory:

		package somepackage 

		import "testing"

		func Test_should_have_correct_result(t *testing.T) {
			if x:= Thing("a"); x!="hello a" {
				t.Error("I wanted hello a. I got: " + x)
			}
		}

Any functions in hello_test.go starting with Test will be run.

You can run all the tests by issuing this command in your source directory:

		go test
		// or 'go your/package/name test' if you're not in the source directory.
