title: Golang regex: Replace and split
tags: golang,golang-regex

You can use the ReplaceAllString methods to replace a string, and manipulate groups if needed.

        rp := regexp.MustCompile("([a-z]+) ([a-z]+)")
        rp.ReplaceAllString("abc def ghi", "$2 $1") // "def abc ghi"

$1 relates to the first group match, and $2 the same. You could just enter text to replace the entireity of the "abc def" string. 

ReplaceAllLiteralString allows you to interpret the dollar sign literally.

You can also use a function to do the replacement. You cannot use a groups here, however, as of 1.1.1 anyway.

        rp.ReplaceAllStringFunc("abc def", func(s string) string {
                if(s=="abc") {
                        return "HA"
                } 
                return s        
        }) // "HA def"

You can split a string using the Split method. The second integer argument is the number of splits to perform. -1 means as many as possible.

        rp = regexp.MustCompile("a")
        i := rp2.Split("zzzzazzzzz", -1) // ["zzzz", "zzzz"]
