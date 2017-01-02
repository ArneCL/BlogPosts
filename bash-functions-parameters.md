title: Bash: functions and arguments
tags: bash

A function is easily defined in a script as `somename() { echo "blar" }` which you then call via `somename`.

You can pass parameters like `somename "hi there"` and with the definition `somename() { echo ${1}!! }`.
