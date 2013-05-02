Title: Unix shell: For loop 
date: 2013-03-29 20:44:44
Tags: unix,unix-for-loop,unix-zsh,unix-bash

To loop over a set of words, issuing a command for each word do:

		for i in stop start; do service tomcat7 $i; done

This issues the command 'service tomcat7' with the paramters 'stop' and then 'start'. You set the word 'stop' to the paramater $i, and 'start' in the next iteration.

If you're doing it all on one line you need a semi-colon after the final word, 'start' in this instance. And you need 'do' before the actual command.

And you need a semi-colon after the command. And finally 'done'.

This works in both bash and zsh.
