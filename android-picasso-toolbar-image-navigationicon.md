title: Android: Loading an NavigationIcon image into Toolbar via Picasso
tags: android,android-databinding,android-toolbar,android-picasso

Let's first include the Picasso image loading library in our app's gradle file:

    compile 'com.squareup.picasso:picasso:2.5.2'

And in our beautiful AndroidManifest.xml let us not forget the all important permissions:

    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />

Let's now use Picasso to load our image into a mysterious `Target`:

    Picasso.with(toolbar.getContext())
            .load("https://HELLOTHERE.com/YOURIMAGEHERE.png")
            .into(target);

What's the `target`? Well, since we're not loading directly into a `ImageView`, we need this object. It can't, apparently, be inline either, lest Picasso may garbage collect it. Here it is:

    Target target = new Target() {
      @Override
      public void onBitmapLoaded(Bitmap bitmap, Picasso.LoadedFrom from) {
        Log.d("HIYA", "onBitmapLoaded");
        Bitmap b = Bitmap.createScaledBitmap(bitmap, 120, 120, false);
        BitmapDrawable icon = new BitmapDrawable(toolbar.getResources(), b);
        toolbar.setNavigationIcon(icon);
      }

      @Override
      public void onBitmapFailed(Drawable errorDrawable) {
        Log.d("HIYA", "onBitmapFailed");
      }

      @Override
      public void onPrepareLoad(Drawable placeHolderDrawable) {
        Log.d("HIYA", "onPrepareLoad");
      }
    };
    
We get a reference to the toolbar, and set the navigation icon, after first resizing the image.

If you want to go wild, crazy, put it in a BindingAdapter:

    @BindingAdapter("app:loadingimage")
    public static void setLoadingimage(final Toolbar toolbar, String s) {
    ...
    }
    
And then in your XML, with databinding, set it like this:

    <android.support.v7.widget.Toolbar
        android:id="@+id/toolbar"
        android:layout_width="match_parent"
        android:layout_height="?attr/actionBarSize"
        app:loadingimage="@{appState.avatarUrl}"
        android:background="?attr/colorPrimary"
        app:popupTheme="@style/AppTheme.PopupOverlay"
        />
