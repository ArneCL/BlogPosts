title: Metadata about tables in postgresql (or in information_schema in general)
tags: postgresql,sql

    SELECT tables.table_name
    FROM information_schema.tables
    WHERE tables.table_schema = 'public' 
    AND tables.table_name != 'schema_version' 
    AND tables.table_type = 'BASE TABLE';
    
The above lists all the tables, excluding schema_version since we don't care about migration info and including only those in the public schema, the ones we created, excluding views by specifying the base table table type.

    SELECT columns.table_name,
      columns.column_name,
      columns.data_type
     FROM information_schema.columns;

The above lists all the coumns in your database along with their type.

    SELECT kcu.constraint_name,
        kcu.table_name,
        kcu.column_name 
      FROM information_schema.key_column_usage kcu
         LEFT JOIN information_schema.table_constraints tc ON tc.constraint_name = kcu.constraint_name
      WHERE tc.constraint_type = 'FOREIGN KEY';
      
The above lists all the foreign key constraints in your database, with the table name and column name which they belong to (not what they reference)

    SELECT constraint_name, table_name, column_name 
    FROM information_schema.constraint_column_usage;

The above lists all the constraints (foreign keys for example), along with the table name and column name which they reference.
