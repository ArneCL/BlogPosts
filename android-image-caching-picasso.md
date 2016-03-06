title: Android: Offine image caching with Picasso
tags: android,android-picasso

If you want to cache images for offline access, it's fairly easy, but you have to include an old version of `OkHTTP`. Here's my gradle imports:

    compile 'com.squareup.picasso:picasso:2.5.2'
    compile 'com.squareup.okhttp:okhttp:2.4.0'

After you've got those, then in the builder, you need to specify an argument for `downloader` and give it the `OkHttpDownloader` class, and give it a max cache size.

      new Picasso.Builder(toolbar.getContext())
        .downloader(new OkHttpDownloader(toolbar.getContext(), Integer.MAX_VALUE))
        .build()
        .load(s)
        .into(target);
