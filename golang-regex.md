title: Golang regex basics: Match and find
tags: golang,golang-regex

You can create a regular expressions conforming to RE2 using the Compile or MustCompile method on regexp.

		rp := regexp.MustCompile("[a-z]+")
		rp1, err := regexp.Compile("[a-z]+")

The first panics if the regex is incorrect. The second returns an error message if the regex is incorrect.

You can match with MatchString(str). If you omit the String in the method name, it will expect a byte array. 

		foundBool := rp.MatchString("abc")

The Find methods -- and others -- confirm to this general pattern.

* The FindString methods returns the first match
* If you have the word All (FindAllString) in the name it returns a specifed number of matches, or all with -1.

		rp.FindString("abc def") // "abc"
		rp.FindAllString("abc def", -1) // ["abc", "def"]

* If you have the word Submatch (FindAllSubmatch) it will give you any groups in the match, as two dimensional slice.

		rp := regexp.MustCompile("([a-z])([a-z])[a-z]+")
		rp.FindAllStringSubmatch("abc") // ["abc", "a", "b"]

* If you have the word Index at the end it will return a int slice with the starting and ending point of the match, including groups

		rp := regexp.MustCompile("([a-z])([a-z])[a-z]+")
		rp.FindAllStringSubmatch("abc") // [0, 3, 0, 1, 1, 2]

The first two ints are the start and end of the match. The next two are the next group match. The next two likewise. 
