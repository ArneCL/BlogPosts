title: Android: Section headers with RecyclerView and multiple view types
tags: android,android-recyclerview

Android RecyclerView doesn't have section headers natively. Mainly because this is an iOS-centric feature and often looks odd in Android. However, sometimes your employers don't care!

We achieve this effect, however, with RecyclerView view types.

Firstly, instead of passing a String list, for example, to your recycler view adapter, pass a list of objects that specify whether the data should be used as a section header or not. Here's an example of that. 

    // In a fuller example, this would probably hold more data than just strings.
    public class SectionOrRow {

        private String row;
        private String section;
        private boolean isRow;

        public static SectionOrRow createRow(String row) {
            SectionOrRow ret = new SectionOrRow();
            ret.row = row;
            ret.isRow = true;
            return ret;
        }

        public static SectionOrRow createSection(String section) {
            SectionOrRow ret = new SectionOrRow();
            ret.section = section;
            ret.isRow = false;
            return ret;
        }

        public String getRow() {
            return row;
        }

        public String getSection() {
            return section;
        }

        public boolean isRow() {
            return isRow;
        }
    }

We create one of these objects with `SectionOrRow.createRow("a normal row")` or `SectionOrRow.createSection("a section header")`, and the `isRow` boolean is set accordingly. 

Once you've created a list of these objects let's now send them to our recycler view:

    public class MyRecycler extends RecyclerView.Adapter<RecyclerView.ViewHolder>{

        private List<SectionOrRow> mData;

        public MyRecycler(List<SectionOrRow> data) {
            mData = data;
        }

        ...

        @Override
        public int getItemCount() {
            return mData.size();
        }

        ...

      }

This is standard, with the data passed in and the item count coming from the data. 

Next let's define the `getItemViewType` method, which tells our recycler view there will be two types, a row type and a section type, and we'll specify which position these are in by looking at the `isRow` boolean in our above data object:

    @Override
    public int getItemViewType(int position) {
        super.getItemViewType(position);
        SectionOrRow item = mData.get(position);
        if(!item.isRow()) {
            return 0;
        } else {
            return 1;
        }
    }

Now there's two type types, we'll need two types of views in our `onCreateViewHolder`. In our case, we're just using the standard `simple_list_item_1` for both but with a blue text background for the section. Your rows and section headers will obviously be more complex:

    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        if(viewType==0) {
            View v = LayoutInflater.from(parent.getContext()).inflate(android.R.layout.simple_list_item_1, parent, false);
            v.findViewById(android.R.id.text1).setBackgroundColor(Color.BLUE);
            return new SectionViewHolder(v);
        } else {
            View v = LayoutInflater.from(parent.getContext()).inflate(android.R.layout.simple_list_item_1, parent, false);
            return new RowViewHolder(v);
        }
    }

This also shows we have two different view holders. Because our layout is so simple, these are pretty much the same, but in a fuller example they would be different:

    public class RowViewHolder extends RecyclerView.ViewHolder{
        private TextView textView;
        public RowViewHolder(View itemView) {
            super(itemView);
            textView = (TextView) itemView.findViewById(android.R.id.text1);
        }
    }

    public class SectionViewHolder extends RecyclerView.ViewHolder{
        private TextView textView;
        public SectionViewHolder(View itemView) {
            super(itemView);
            textView = (TextView) itemView.findViewById(android.R.id.text1);
        }
    }

Finally, let's display the row in `onBindViewHolder`. Depending on whether it's a row or not, we cast the holder to appropriate type, and give it some data that we managed to pass in.

    @Override
    public void onBindViewHolder(RecyclerView.ViewHolder holder, int position) {
        SectionOrRow item = mData.get(position);
        if(item.isRow()) {
            RowViewHolder h = (RowViewHolder) holder;
            h.textView.setText(item.getRow());
        } else {
            SectionViewHolder h = (SectionViewHolder) holder;
            h.textView.setText(item.getSection());
        }
    }

And that's the basics of putting sections in your RecyclerView with view types.
