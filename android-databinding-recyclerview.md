title: Android: Databinding and RecyclerView
tags: android,android-databinding,android-recyclerview

If you want to do databinding in a RecyclerView:

0. Ensure the `ViewHolder` has a variable for the binding.
0. Change `onCreateViewHolder` to inflate your binding and pass that to `ViewHolder` to return
0. Setup the bindings in `onBindViewHolder`

For example:

    public class MyRecycler extends RecyclerView.Adapter<MyRecycler.ViewHolder>{

        @Override
        public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
            ListitemBinding viewDataBinding = DataBindingUtil.inflate(LayoutInflater.from(parent.getContext()), R.layout.listitem, parent, false);
            return new ViewHolder(viewDataBinding);
        }

        @Override
        public void onBindViewHolder(ViewHolder holder, int position) {
            holder.binding.setYoyo("Position: " + position);
        }

        @Override
        public int getItemCount() {
            return 40;
        }

        public class ViewHolder extends RecyclerView.ViewHolder{
            private ListitemBinding binding;
            public ViewHolder(ListitemBinding itemView) {
                super(itemView.getRoot());
                binding = itemView;
            }
        }
    }
