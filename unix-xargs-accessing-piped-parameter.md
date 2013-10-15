title: Unix: Access piped parameter with xargs
tags: unix, unix-xargs

When you pipe something to xargs you normally don't need to access its name, since it's added to the end of the command:

    echo 'hiya' | xargs echo 'i said'
  
This would print 'i said hiya'.

If you want to access the passed parameter, 'hiya', you can do so by passing -i to xargs, and using {}:

    echo 'hiya' | xargs -i echo ' {} was just said'
  
This would print 'hiya was just said'.
