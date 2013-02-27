Title: SQL: Renaming columns in sqlite
Tags: sqlite|sql|sql-renamecolumns
Date: 2013-02-18 17:50:09 -0500 
Author: Denevell


You can't easily do this in sqlite. Say you have a table with a schema:

    CREATE TABLE ANOTHERTHING (ID NUMBER(10) NOT NULL, TEXT VARCHAR, PRIMARY KEY (ID));

And you want to rename the column 'text' to 'sometext', you need to make a new table with that schema, rename the current table, copy all the data over into the new table and then drop the renamed table:

    alter table anotherthing rename to anotherthing_1;
    create table anotherthing (id number(10) not null, sometext varchar, primary key (id));
    insert into anotherthing(id, sometext) select id, text from anotherthing_1;
    drop table anotherthing_1;
