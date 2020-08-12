title: Postgresql dump all functions to a file
tags: sql-postgresql,sql-postgresql-functions,sql
date: Mar 13, 2016

If you want to dump all the functions in your schema, public in the case, do this:

    SELECT pg_get_functiondef(f.oid)
    FROM pg_catalog.pg_proc f
    INNER JOIN pg_catalog.pg_namespace n ON (f.pronamespace = n.oid)
    WHERE n.nspname = 'public';

If you issue `\o somefile.sql` and then issue the above you'll save the functions to a file.
