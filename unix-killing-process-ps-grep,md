Title: Unix: Killing a process using ps, grep and nawk
{{wl-tags:unix|unix-grep|unix-awk}}{{wl-publish: 2013-02-09 12:29:24 -0500 | Denevell }}

     ps ax | grep -v grep | grep PROCESSNAME | nawk '{print $1}'

This will show your processes, remove any with the word 'grep' in them, grep your PROCESSNAME, run nawk to get the pid of it.

If you pass this to kill -9, you'll kill the service:

     kill -9 `ps ax | grep -v grep | grep PROCESSNAME | nawk '{print $1}'`
