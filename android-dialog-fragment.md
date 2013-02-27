Title: Android: DialogFragment
Tags: android|android-dialogues|android-fragments|android-dialogfragment
Date: 2013-01-06 14:28:07 -0500 
Author: Denevell

You call a DialogFragment into existence by making a new dialogue object using a static constructor with its data (see below) and then issuing the show() method, passing in your FragmentManager and optional tag.

     newFragment = BasicDialogueFragment.newInstance("title", "message");
     newFragment.show(context.getSupportFragmentManager(), "tag");  	

Now here's the BasicDialogFragment class. Note the static newInstance() which takes in the parameters and stores them in a bundle which retained in the fragment through setRetainInstance(true);

We use newInstance() instead of passing arguments into the Fragment's constructor since the documentation and lint warn us against that, since the Fragment may be reinitialised via a call to the Fragment's constructor with no arguments.

     public class BasicDialogueFragment extends android.support.v4.app.DialogFragment {
      private String mTitle;
      private String mMessage;
     
      public static BasicDialogueFragment newInstance(String title, String message) {
        BasicDialogueFragment dialogue = new BasicDialogueFragment();
        dialogue.mTitle = title;
        dialogue.mMessage = message;
        return dialogue;
      }
     
      @Override
      public Dialog onCreateDialog(Bundle savedInstanceState) {
        setRetainInstance(true);
        AlertDialog.Builder builder = new AlertDialog.Builder(getActivity());
        builder.setMessage(mMessage);
        builder.setTitle(mTitle);	
        return builder.create();
      }
     
      @Override
      public void onDestroyView() {
       // Used because of a bug in the support library
       if (getDialog() != null && getRetainInstance())
          getDialog().setDismissMessage(null);
       super.onDestroyView();
      }      
     }
