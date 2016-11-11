title: Android: RecyclerView with animated expandable sections
tags: android,android-recyclerview

In previous posts, we've created a RecyclerView with section headings and a click listener. Look for posts under the android-recyclerview tag. 

We continue to use our data object, `SectionOrRow`, that defines if the data is a section or a row. But we will change three lines in the adapter. These changes will define our list size and the list item by taking into account the hidden positions.

In `getItemCount()` we will get the size from `SectionOrRow.getSizeExcludingHidden(mData)`. And in `getItemViewType()` and `onBindViewHolder()` we will get the data item by calling `SectionOrRow.getUnderlyingItem(mData, position)`.

Outside our adapter, we will now look for clicks on the section headings. If we get one, we will check if it's expanded or not, and if it is we will call a method that hides or shows our rows:

    adapter.setClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View v) {
            // Get the position of the view
            int visiblePosition = YOUR_RECYCLER_VIEW.indexOfChild(v);
            // Get the item it represents
            StringSectionOrRow item = SectionOrRow.getUnderlyingItem(data, visiblePosition);
            // if the section is not hidden, hide the section, and if it is, show it.
            if(!item.isRow() && !item.getSectionHidden()) {
                int numberHidden = SectionOrRow.hideUntilNextSection(data, visiblePosition, true);
                adapter.notifyItemRangeRemoved(numberHidden+1, numberHidden);
            } else if(!item.isRow() && item.getSectionHidden()) {
                int numberShown = SectionOrRow.hideUntilNextSection(data, visiblePosition, false);
                adapter.notifyItemRangeInserted(numberShown+1, numberShown);
            }
        }
    });

`SectionOrRow.hideUntilNextSection(data, visiblePosition, true)` will look at our list of data, and set all the rows until the next section as hidden. The last parameter defines if we're going to set it to hidden or not.

`adapter.notifyItemRangeInserted(visiblePosition+1, hidden)` tells our recycler view to animate the insertion of our views, or to animate their delection. That is, when we set our underlying data to hidden, we want the recycler view to animate their removal.

Our old `SectionOrRow` class now has two new booleans: `hidden` and `sectionCollapsed`. These define if we should show or hide the row and if the section is collapsed.

The first new method in this class is the one used to size the list including all the hidden rows. Its implementation is straight forward.

    public static int getSizeExcludingHidden(List<SectionOrRow> rows) {
        int size = 0;
        for (StringSectionOrRow r : rows) {
            if(!r.hidden) size++;
        }
        return size;
    }

The second is used internally only. You give it the position which does not include all the hidden cells. The adapter will give you this value. It will then return the position including the hidden rows.

We loop over all the underlying items, and if such is not hidden we increment a `visibleRow` integer. Eventually this will match the position we're looking for, and we return the underlying position:

    private static int getUnderlyingRowPosition(List<StringSectionOrRow> rows, int visiblePosition) {
        int underlyingRow = 0, visibleRow = 0;
        for (; underlyingRow < rows.size(); underlyingRow++) {
            StringSectionOrRow stringSectionOrRow = rows.get(underlyingRow);
            if(!stringSectionOrRow.hidden && visibleRow==visiblePosition) break;
            if(!stringSectionOrRow.hidden) visibleRow++;
        }
        return underlyingRow;
    }

The next method is the one where we get the item to display. We give it the position in the adapter that does not include all the hidden cells. And, via the above, it returns the underlying row for the adapter to display:

    public static SectionOrRow getUnderlyingItem(List<StringSectionOrRow> rows, int visiblePosition) {
        return rows.get(getUnderlyingRowPosition(rows, visiblePosition));
    }

Our final function is the one we use to set the rows to be hidden or shown. We give it the row objects the adapter is given, the position of our section header (as found in the above click listener) and then define if we want to either hide or show the rows:

    public static int hideUntilNextSection(List<StringSectionOrRow> rows,
                                           int visiblePosition,
                                           boolean hide) {
        // What's he underlying row data
        int underlying = StringSectionOrRow.getUnderlyingRowPosition(rows, visiblePosition);
        SectionOrRow section = rows.get(underlying);
        // Say that's now collapsed (or fully visible)
        section.setSectionCollapsed(hide);
        underlying++; // Go to the next row
        // Let's now either show or hide those values
        // until we reach the next section
        int rowsHidden = 0;
        for (int i = underlying; i < rows.size();i++,rowsHidden++) {
            StringSectionOrRow r = rows.get(i);
            if(!r.isRow) break;
            else {
                r.setHidden(hide);
            }
        }
        return rowsHidden;
    }

Now when the recycler view sizes itself, it takes into account the hidden cells, and when it display an item, it does the same. 

When one its section heading is clicked, it checks if it's already collapsed, if it is it sets all the rows under that section to visible, and the animates their insertion. 

Equally, if the section is not collapsed, it sets all the rows to hidden, and animates their removal.
