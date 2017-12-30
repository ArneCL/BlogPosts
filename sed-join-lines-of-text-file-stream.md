title: Join lines of a text file with sed
tags: sed

If you have a text file like:
```
A
0
B
1
C
2
```
You may want that to look like
```
A,0
B,1
C,2
```
`sed` will help you. `sed N` joins two lines. `sed N;s/\n/,/` replaces the newlines for a comma.

If instead of `A,0` you have `0,A` you can swap them around with awk: `awk -F ',' '{print $2","$1}'`
