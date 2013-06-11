Title: Golang: Maps
Tags: golang

A map is a key value store of data. You define it using the map keyword, the key type in brackets, then the value type:

		var aMap map[string]string

If you attempt to read from this you will get the zero value, "" in this case, of the key. If you try to assign a value to a key, it will crash.

You must use make to create a new map. Or use the literal syntax.

		aMap := make(map[string]string)
		anotherMap := map[string]string {"a":"b", "c":"d",}

You can grab values using the key after the map name in square brackets

		sth := anotherMap["a"] // Will return "b"
		sth = anotherMap["z"]  // Will return "", the zero value

Since a map will return the zero value on not found, you can use a map of booleans to implement a set data structure.

If you assign to two variables, the second is whether the value is found or not:

		val, found := anotherMap["a"] // Using the code above, found will be true, and value will be "b"

If your values are slices, you can append an item, even if the value is nil, with the append function (since add something to a nil slice creates the slice):

		myMap := make(map[string][]string)
		// At this point myMap["a"] is nil
		myMap["a"] = append(myMap["a"], "z")
		// At this point myMap["a"] is ["z"]

Your key be any simple type. In addition, structs (containing only comparable types), interface types, channels and more.

You can use struct keys and simple values to simplify adding data to a map. With complex types as values, such as maps or slices, you will need to check they are not there and possibly allocate space. 

Instead use a key struct, encoding the data in that struct, and have the value as a simple type like a number.

		aMap[SomeStruct{"hi", 123}]++
		// The downside here is your lookup will need to have all that data inside

Maps are not atomic. You will have to use locking if one can be access simultaneously. Or refactor the code so that only one goroutine can access it.
