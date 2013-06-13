title: Android: Parcelable objects tutorial
tags: android, android-parcelable

Parcelable objects allow you to serialise and deserialise on activity or fragment stop / start. It's like Java's serialisable, but faster.

Make sure your object implements Parcelable:

      public class YourClass implements Parcelable {
        private String aThing;
        private String anotherThing;
        ...

You'll next need a few Parcelable housekeeping methods that, in general, stay the same.

      public static final Parcelable.Creator<YourClass> CREATOR = new Parcelable.Creator<YourClass>() {
      	public YourClass createFromParcel(Parcel in) {
      		return new YourClass(in);
      	}
      
      	public YourClass[] newArray(int size) {
      		return new YourClass[size];
      	}
      };
      
      @Override
      public int describeContents() {
        return 0;
      }	
      
The static CREATOR class creates your object from a Parcel via the createFromParcel method that takes in a parcel and passes it to a constructor in your class that does the grunt work.

The newArray method allows an array of your objects to be parcelled.

The describeContents method is generally not used. Some information of its possible uses are here: http://stackoverflow.com/questions/4076946/parcelable-where-when-is-describecontents-used/4914799#4914799

Note: You don't call the above methods. They're used interally by Android in most cases.

Finally, the writeToParcel method writes your fields to a parcel in a particular order.

      @Override
      public void writeToParcel(Parcel dest, int flags) {
      	dest.writeString(aThing);
      	dest.writeString(anotherThing);
      }

Then the constructor with a Parcel argument then gets them back out in that order:

      private YourClass(Parcel in) {
      	aThing = in.readString();
      	anotherThing = in.readString();
      }	

Now you can use this object where ever you can use a Parcelable. For instance, passing arguments to Bundles:

      Bundle b = new Bundle();
      b.putParcelable("someId", new YourClass());
      fragment.setArguments(b);
      // Load the fragment
