title: Android: Creating icons with imagemagick
tags: android,unix,imagemagick

If you have an image, and you want to convert it to the sizes for an icon, such as the one for the actionbar, this will work:

Move 'yourimage.png' into your res/ folder
  
  convert yourimage.png -resize 48x48 drawable-mdpi/yourimage.png
  convert yourimage.png -resize 72x72 drawable-hdpi/yourimage.png
  convert yourimage.png -resize 96x96 drawable-xhdpi/yourimage.png
  convert yourimage.png -resize 144x144 drawable-xxhdpi/yourimage.png
