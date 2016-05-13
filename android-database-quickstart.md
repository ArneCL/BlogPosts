title: Getting started with SQLite and Android
tags: android,android-sqlite,android-database

Here's a code sample to quickly add and query an sqlite database. There are better ways. This is the basic.

Here's the helper that creates your database, and optionally upgrades it:

    private static class DatabaseHelper extends SQLiteOpenHelper {
      private static final String SQL_CREATE_ENTRIES =
              "CREATE TABLE whoopwhoop (" +
                      "_id INTEGER PRIMARY KEY NOT NULL," +
                      "t text NOT NULL)";
      public DatabaseHelper(Context context) {
        super(context, "yourdatabasename", null, 1);
      }
      @Override public void onCreate(SQLiteDatabase sqLiteDatabase) {
        sqLiteDatabase.execSQL(SQL_CREATE_ENTRIES);
      }
      @Override public void onUpgrade(SQLiteDatabase sqLiteDatabase, int i, int i1) {}
    }

Next let's use that to create the database, pass content values into it to insert and then query it.

    SQLiteDatabase db = new DatabaseHelper(YOUR_APPLICATION_CONTEXT).getWritableDatabase();
    ContentValues cv = new ContentValues();
    cv.put("t", "woooooo");
    long insert = db.insert("whoopwhoop", "null", cv);
    Log.d("HIYA", ""+insert);
    
Here's the code to query it. You should be using placeholder values in `rawQuery` to make it sql injection safe.
    
    Cursor query = db.rawQuery("SELECT * FROM whoopwhoop", null);
    query.moveToFirst();
    Log.d("HIYA", ""+query.getInt(query.getColumnIndex("_id")));
    Log.d("HIYA", query.getString(query.getColumnIndex("t")));
