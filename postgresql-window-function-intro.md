title: Postgresql: Window functions intro
tags: postgresql, postgresql-window

The `group by` SQL statement winds up all rows based on a column. Then you use aggregate functions to output something based on the wound up rows.

Sometimes you don't want to wind up all the rows. You may want them to display as normal. But calculate a value on a load of rows (say, a 'window' of rows...).

This is where `Window functions` come into play.They allow you to specify a load of (or window of) rows on which to use a aggregate function.

Let's say we have this table.

     name  | department | salary 
    -------+------------+--------
     chris | IT         |  30000
     jason | IT         |  35000
     kate  | IT         |  22000
     david | sales      |  40000
     matt  | sales      |  45000
     james | sales      |  50000

We could use this SQL to output salary averages of the departments.

    select department, avg(salary) from employees group by department;
     department |        avg
    ------------+--------------------
     IT         | 29000.000000000000
     sales      | 45000.000000000000
     
But we may not want to wind all the columns up, just diplay an average column after each row. In that case:

       select name, department, salary, avg(salary) over (partition by department) from employees;
        name  | department | salary |        avg         
       -------+------------+--------+--------------------
        chris | IT         |  30000 | 29000.000000000000
        jason | IT         |  35000 | 29000.000000000000
        kate  | IT         |  22000 | 29000.000000000000
        david | sales      |  40000 | 45000.000000000000
        matt  | sales      |  45000 | 45000.000000000000
        james | sales      |  50000 | 45000.000000000000

We use the 'over' keyword to specify the column we want to partition our window by.

And, voila.
