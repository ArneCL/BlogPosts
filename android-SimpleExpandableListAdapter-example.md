title: Android: SimpleExpandableListAdapter example and tutorial
tags: android, android-listview

The SimpleExpandableListAdapter is not simple. It is, however, an ExpandableListAdapter. 

Its nine argument constructor can be divided into three parts:

    new SimpleExpandableListAdapter(
      this,
  
      groupData,
      android.R.layout.simple_expandable_list_item_1,
      new String[] { "ROOT_NAME" },
      new int[] { android.R.id.text1 },
  
      childData,
      android.R.layout.simple_expandable_list_item_2,
      new String[] { "CHILD_NAME", "CHILD_NAME" },
      new int[] { android.R.id.text1, android.R.id.text2 }
    );
    
The first section is just the context. The second is the group data. The third is the child data. We'll look at the second section first.

**Second section of parameters: group views**

The groupData is a list of maps. Each map represents a row of the list:

    List<Map<String, String>> groupData = new ArrayList<Map<String, String>>() {{
      add(new HashMap<String, String>() {{
      	put("ROOT_NAME", "Group 1");
      }});
      add(new HashMap<String, String>() {{
      	put("ROOT_NAME", "Group 2");
      }});
    }};
    
So each Hashmap has a key "ROOT_NAME" with a value. This will be printed as the row name, as we will see below.

Let's look at the arguments again: 

      ...
      groupData, // param 2
      android.R.layout.simple_expandable_list_item_1, // param 3
      new String[] { "ROOT_NAME" }, // param 4
      new int[] { android.R.id.text1 }, // param 5
      ...
      
So the groupData will have a list of maps. In those maps there'll be a value with the key ROOT_NAME (param 4). That value will be mapped to a android.R.id.text1 view id (param 5). That view must exist on android.R.layout.simple_expandable_list_item_1 (param 3).

Now we've done the group data. We'll do the child data:

**Third section of parameters: child views**

Again we have a list of maps, a childGroup. Each childGroup item will relate to a child element of a tier one row. 

And so, we have to have a list of these childGroups. The first in the list of childGroups relates to a tier one row.

    List<List<Map<String, String>>> listOfChildGroups = new ArrayList<List<Map<String, String>>>();
    
    List<Map<String, String>> childGroupForFirstGroupRow = new ArrayList<Map<String, String>>(){{
      add(new HashMap<String, String>() {{
      	put("CHILD_NAME", "child in group 1");
      }});
      add(new HashMap<String, String>() {{
      	put("CHILD_NAME", "child in group 1");
      }});
    }};
    listOfChildGroups.add(childGroupForFirstGroupRow);
    
    List<Map<String, String>> childGroupForSecondGroupRow = new ArrayList<Map<String, String>>(){{
      add(new HashMap<String, String>() {{
      	put("CHILD_NAME", "child in group 2");
      }});
      add(new HashMap<String, String>() {{
      	put("CHILD_NAME", "child in group 2");
      }});
    }};
    listOfChildGroups.add(childGroupForSecondGroupRow);
    
Now we have that datastructure we use it in the same way as we did for the group data:

                ...
                listOfChildGroups,
                android.R.layout.simple_expandable_list_item_2,
                new String[] { "CHILD_NAME", "CHILD_NAME" },
                new int[] { android.R.id.text1, android.R.id.text2 }
                ...
      
In each listOfChildGroups item, there's a map. That map has a key called CHILD_NAME. The value for that is given to the TextView referenced by android.R.id.text1 and both android.R.id.text2. Those textviews exist on the android.R.layout.simple_expandable_list_item_2,.

And now:

  	expandableListView.setAdapter(thatHorrificSimpleExpandableListAdapter);

Apparently extending the BaseExpandableListAdapter is seen as a better option most of the time.
