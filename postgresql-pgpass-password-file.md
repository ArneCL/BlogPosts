title: Postgresql: Use of psql, .pgpass file and PGPASSFILE to store passwords
tags: sql,sql-postgresql
date: May 26, 2016

If you don't want to enter your password in everytime you use `psql`, you can use a .pgpass file.

The file itself--`.pgpass`--is in the format `YOUR_HOST:YOUR_PORT:DB_NAME:USER_NAME:PASSWORD`. I.e.

    localhost:5432:my_db:dave:mypasswordismylife

Importantly, you need to give the password file the `600` permission, or psql will just ignore it, so:

    chmod 600 .pgpass

Then psql should, normally, just pick that up. If not do something like 

    PGPASSFILE=/home/dave/.pgpass psql -h localhost -U dave -d my_db 
