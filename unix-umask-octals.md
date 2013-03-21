title: Unix: umask octals explained
tags: unix, unix-umask

'umask' tells you what your default file creation permissiona are.

'umask -S' tells you what they are in human readable format

		u=rwx,g=rx,o=rx

That says the user has read, write and execution permissions. And the group and others can only read and execute.

The following changes that so the others don't have read rights.

		umask o-r

You can also use octals to do the same thing. 'umask' on its own will (normall) tell you

		0022

If you ignore the first digit (used for special permissions), each digit represents the permissions that are _disallowed_ for either the owner, group or others.

If you have in your mind this:

		321
		rwx

Then the octal 1 means 'x'. 2 means 'w' and 3 means 'r'.

So when you see 0022 above, it means the group and the others _don't_ have write permission, since the octal 2 means write. 

If it said 0015 then it would mean the group doesn't have execution permission, and the others don't have read or write permission (3 and 2 added together).

In the same way the octal 7 means disallow everything, since 3 plus 2 plus 1 is seven.
