title: Android: A basic RecyclerView
tags:android,android-recyclerview

The RecyclerView is a more efficient version of GridView and ListView. With animated bells and whistles. And it works with CoordinatorLayout. You'll want to use it.

Although it's a large topic, here's a basic RecyclerView implementation. First the initialisation code and the XML:

    RecyclerView rc = (RecyclerView) layout.findViewById(R.id.rec_view);
    rc.setAdapter(new MyRecycler());
    LinearLayoutManager mLayoutManager = new LinearLayoutManager(context);
    rc.setLayoutManager(mLayoutManager);

The initialisation code is very similar to ListView's. But we have to set the LayoutManager.

    <android.support.v7.widget.RecyclerView
        android:id="@+id/rec_view"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:scrollbars="vertical"
        >
    </android.support.v7.widget.RecyclerView>
  
The XML is just about the same as for a ListView.

The adapter is different, however:

    public class MyRecycler extends RecyclerView.Adapter<MyRecycler.ViewHolder>{
  
        @Override
        public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
            View v = LayoutInflater.from(parent.getContext()).inflate(R.layout.listitem, parent, false);
            ViewHolder vh = new ViewHolder(v);
            return vh;
        }
  
        @Override
        public void onBindViewHolder(ViewHolder holder, int position) {
            holder.textView.setText("Stuff, innit. " + position);
        }
  
        @Override
        public int getItemCount() {
            return 40;
        }
  
        public class ViewHolder extends RecyclerView.ViewHolder{
            private TextView textView;
            public ViewHolder(View itemView) {
                super(itemView);
                textView = (TextView) itemView.findViewById(R.id.listtext);
            }
        }
    }

The first difference is it forces the ViewHolder pattern. The inner class is the generic class which extends the Adapter. It fetched View's from a passed-in View and makes such available as public fields.

Then `onCreateViewHolder` inflates a layout, and sets the ViewHolder with it. `onBindViewHolder` sets the holder with values, mostly likely values passed in to the adapter in a real world situation.
    
