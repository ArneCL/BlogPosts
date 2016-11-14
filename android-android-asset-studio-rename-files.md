title: Bulk renaming files in Android Asset Studio download
tags: android,unix-xargs

If you use Roman Nurik's wonderful [Android Asset Studio](https://romannurik.github.io), you'll get a downloaded zip of differently sized icons.

You may want to rename these files from `ic_launcher.png` to something else - otherwise it may clash with an existing file of that name.

You can use `xargs` to do this. Move to the directory of the downloaded file, in the `res` directory and run this:

    ls | xargs -I {} mv {}ic_launcher.png {}YOUR_NEW_FILENAME.png

We list each ` mipmap-xxxx` directory, and rename all the ic_launcher.png files within to our new filename.
