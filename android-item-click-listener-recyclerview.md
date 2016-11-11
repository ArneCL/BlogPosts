title: Android: On item click listener for RecyclerView Adapter
tags: android,android-recyclerview

`RecyclerView.Adapter`, unlike its `ListView` colleague, does not have a item click listener. 

You can, however, use a normal `View.OnClickListener` and then use `indexOfChild` to get the position of the view in the recycler view.

Add the callback setter to your adapter:

    public void setClickListener(View.OnClickListener callback) {
        mClickListener = callback;
    }

And in your `onCreateViewHolder` set that:

    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.some_layout, parent, false);
        RecyclerView.ViewHoldre holder = new SomeViewHolder(v);
        holder.itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                mClickListener.onClick(view);
            }
        });
        return holder;
    }

Now, outside the adapter, you can fetch the position like so:

    YOUR_RECYCLER_ADAPTER.setClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            int pos = YOUR_REYCLER_VIEW.indexOfChild(v);
            ...
        }
    });

And then `pos` will have the index of the view. 

This is better than having the position passed through in the callback, since any callback binding may have the incorrect position, if the internal position of the views change.
