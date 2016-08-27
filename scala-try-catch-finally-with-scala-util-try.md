title: Scala: Using Scala's Try utility as an alternative to Java's Try/Catch/Finally
tags: scala,scala-try

Let's recall this standard SQL query code with the standard Java-esq try/catch/finally:

    try {
      stmt = conn.createStatement
      rs = stmt.executeQuery(sql)
      // Deal with result set
      somethingToReturn
    } catch {
      case e: Exception => ...
    } finally {
      if(stmt!=null) stmt.close
      if(rs!=null) rs.close  
    }

With `scala.util.{Try,Failure,Sucess}` it would be:

    var insert = Try({
      stmt = conn.createStatement
      rs = stmt.executeQuery(sql)
      // Deal with result set
      somethingToReturn
    })
    if(stmt!=null) stmt.close
    if(rs!=null) rs.close  
    insert match {
      case Success(s) => s
      case Failure(e) => ...
    }

The `Try` block has our code that may throw an exception.

Then we perform the code that was in the `finally` block after that.

And then finally we match if the `Try` value is a success or failure.

We've done a few things:

* The `finally` code is no longer indented
* Our lines no longer starts with `{ keyword`
* The code that either returns or fails is at the end now

This arguable makes things more readable.
