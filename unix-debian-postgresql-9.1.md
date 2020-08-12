Title: Debian: Setting up Postgresql 9.1 on Debian Squeeze
Tags: unix,unix-debian,sql-postgresql,sql
date: Apr 28, 2013

First add the squeeze backports to /etc/apt/sources.list:

		deb http://backports.debian.org/debian-backports squeeze-backports main

Then issue:

		apt-get update
		apt-get -t squeeze-backports install postgresql-9.1

Then login as the postgres user and start up psql:

		su - postgres
		psql

Now create a new user with a new password and create a database as that user:

		create user myuser password 'mypassword'
		create database mydatabase owner myuser;
		\q

Now you've exited psql, log out of the postgres unix user, and attach the the postgres program remotely:

		<ctrl-d>
		psql -h localhost -U myuser -d mydatabase

Now it'll ask you to enter in the password 'myuser'. You can now start issuing sql commands. Or \? to see help for psql commands.
