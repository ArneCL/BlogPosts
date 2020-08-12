title: Postgresql: Remove punctuation from field with a regex
tags: sql, sql-postgresql
date: Mar 16, 2017

Sometimes it's useful to remove all punctuation from a field.

Take the sentence `It's done - and dusted, finally. & that's that.`. We'll use regexp_replace on this.

    select regexp_replace(lower($$It's done - and dusted, finally. & that's that. $$),$$\sand\s|[&\.,\s'-]$$,$$$$,$$g$$)

That results in `itsdonedustedfinallythatsthat`. We've also removed the word ` and `. 

If we use `It's done--and dusted, finally. & that's that.` then the `\sand\s` matcher would fail. It's an exercise to the reader to work a way around that.

We've also not dealt with `$` and the like, but that's also facile to remove using the above.
