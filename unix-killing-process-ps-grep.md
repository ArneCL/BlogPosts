Title: Unix: Killing a process using ps, grep and nawk
Tags: unix|unix-grep|awk
Date: 2013-02-09 12:29:24 -0500 
Author: Denevell

     ps ax | grep -v grep | grep PROCESSNAME | nawk '{print $1}'

This will show your processes, remove any with the word 'grep' in them, grep your PROCESSNAME, run nawk to get the pid of it.

If you pass this to kill -9, you'll kill the service:

     kill -9 `ps ax | grep -v grep | grep PROCESSNAME | nawk '{print $1}'`
