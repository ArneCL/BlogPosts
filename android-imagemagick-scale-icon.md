title: Android: Creating icons with imagemagick
tags: android,unix,imagemagick

If you have an image, and you want to convert it to the sizes for an icon, such as the one for the actionbar, this will work:

Move 'yourimage.png' into your res/ folder
  
    convert yourimage.png -resize 48x48 drawable-mdpi/yourimage.png
    convert yourimage.png -resize 72x72 drawable-hdpi/yourimage.png
    convert yourimage.png -resize 96x96 drawable-xhdpi/yourimage.png
    convert yourimage.png -resize 144x144 drawable-xxhdpi/yourimage.png
    
Here's a bash script that does the conversion, call it via bash convert.sh yourimage.png youroutputimage.png

    echo Converting $1 into $2 into the drawable directories.
    echo Sizes: 144 = xxhdpi, 96, 72, 48 = mdpi
    
    convert $1 -resize 48x48 drawable-mdpi/$2
    convert $1 -resize 72x72 drawable-hdpi/$2
    convert $1 -resize 96x96 drawable-xhdpi/$2
    convert $1 -resize 144x144 drawable-xxhdpi/$2

