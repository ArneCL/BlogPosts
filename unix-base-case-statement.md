title: Bash: case statement
tags: unix,unix-bash

The case statement is simple enough, and notibily works with regular expressions:

    case $SOMESTRING in
    "starts_with_"*)
      # Uses a regex
      ;;
    *)
      #anything else
      ;;
    esac

`esac` is `case` backwards.
