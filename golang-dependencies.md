Title: Golang: Dependencies 
Tags: golang,golang-dependencies

You can add libraries from the internet into your workspace with the 'go get' tool. If you wanted to get the memcache library you would run:

		go get github.com/bradfitz/gomemcache/memcache

'go get' understands the url, and plenty of others, to grab the go files in the memcache directory of that repository, put them in your src folder in $GOPATH/src/github.com/bradfitz/gomemcache/memcache/ and build the library to place them in $GOPATH/pkg/github.com/bradfitz/gomemcache/memcache.a.

This will automatically grab any dependencies that gomemcache has.

In your main file, you can reference it by referencing the namespace that's now in your $GOPATH/src/ and $GOPATH/YOUR_ARCH/pkg/ directories.

		package main

		import "fmt"
		import "github.com/bradfitz/gomemcache/memcache" 

		func main() {
			fmt.Printf("Hello, world.\n")
			memcache.New("10.0.0.1:11211", "10.0.0.2:11211", "10.0.0.3:11212")
		}

This shows go to use the external library we included above. It obviously does nothing.

When you next install your golang program, it will be statically linked against gomemcache.
