title: Alter a Postgresql constraint on a table
tags: postgresql, postgresql-alter-table, postgresql-constraints

If you have a constraint you wish to alter, you need to drop it and re-add it.

First let's look at the constraint with ``\d+ yourtable``

    \d+ youtable
    ...
    Foreign-key constraints:
    "constraint_name" FOREIGN KEY (some_id) REFERENCES yourtable(some_id)

We can we see the, in this case, foreign key constraint we want to alter. We'll use text above later.

Now let's drop the constraint.

    alter table yourtable drop constraint constraint_name;
    
Now let's copy the text we saw above, and paste it after the text ``alter table yourtable add constraint``.

    alter table yourtable add constraint "constraint_name" FOREIGN KEY (some_id) REFERENCES yourtable(some_id) on delete cascade;

In our case, we altered the constraint by adding ``on delete cascade``.
