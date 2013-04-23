title: Apache Derby setup and ij usage
tags: derby,derby-setup

First download Apache Derby from its website. And put the both to the unzipped folder in your environment, including your PATH.

		export DERBY_HOME = /your/path
		export PATH=$PATH:$DERBY_HOME/bin

You also need to set the derby property to say the database is on localhost for the 'ij' property:

		set DERBY_OPTS=-Dij.protocol=jdbc:derby://localhost/

Now you should be able to run the 'ij' program. Exit it via issuing 'quit;'.

Open up ij, and create a new database:

		ij> CONNECT 'jdbc:derby:firstdb;create=true';

In the current directory you'll have a firstdb/ directory. This constitutes the database. Don't touch the files within!

You can then create a new simple table, insert a value and print the table using the following usual SQL:


		ij> create table one (text varchar(500));
		0 rows inserted/updated/deleted
		ij> insert into one values ('hello');
		1 row inserted/updated/deleted
		ij> select * from one;
		TEXT                                                                                                                            
		--------------------------------------------------------------------------
		hello

Since ij doesn't have a command history, you may want to issue the commands from the command line instead:

		$ echo "connect 'jdbc:derby:firstdb'; select * from one;" | ij
		ij version 10.10
		ij> ij> TEXT                                                                                                                            
		--------------------------------------------------------------------------
		hello                                                                                                                           

		1 row selected
