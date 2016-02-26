title: Android: Restore position of RecycleView after new data via setAdapter()
tags: android,android-recyclerview

Let's say you're refreshing your list of items you want to see in a `RecyclerView`.

If you run `setAdapter()` with the new list of data, it will remove your old list position.

However, if you--when the the system knows you've already set an adapter--then call `notifyDataSetChanged` on the adapter then all will be well.

For instance, in the method that gives it new data, after you've set that new data to `mYourList` in this example:

    if(recyclerView.getAdapter()==null) {
      bd.recView.setLayoutManager(new LinearLayoutManager(getContext(), LinearLayoutManager.VERTICAL, false));
      bd.recView.setAdapter(new YourAdapter(mYourList));
    } else {
      recyclerView.getAdapter().notifyDataSetChanged();
    }
