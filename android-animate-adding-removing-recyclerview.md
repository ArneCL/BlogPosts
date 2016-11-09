title: Android: Animating adding and removing from a recycler view
tags: android,android-recyclerview

Recycler views animate the adding and removing of elements automatically. Let's say you have a standard recyclerview like one we created in a previous post. 

Ensure the row data, `ArrayList<String> stringList` for example, is passed in as a recycler adapter constructor parameter. The size of the recycler adapter should be from that row data.

Now, outside the recycler view, you can add and remove from `stringList` via the standard methods, `stringList.remove(0)` and `stringList.add(0, "new data")`. 

On addition, run `yourAdapater.notifyItemInserted(0)` so it knows to animation insertion. You also need to scroll to that item, else it will just be inserted about the current item, which may be the top item: `yourRecyclerView.scrollToPosition(0)`. 

On deletion, it's simpler. Just do: `yourAdapter.notifyItemRemoved(0)`. No need to scroll anywhere, this time.
