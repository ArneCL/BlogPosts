title: Android: Creating icons with imagemagick
tags: android,unix,imagemagick

If you have an image, and you want to convert it to the sizes for an icon, such as the one for the actionbar, this will work:

Move 'yourimage.png' into your res/ folder
  
    convert yourimage.png -resize 48x48 drawable-mdpi/yourimage.png
    convert yourimage.png -resize 72x72 drawable-hdpi/yourimage.png
    convert yourimage.png -resize 96x96 drawable-xhdpi/yourimage.png
    convert yourimage.png -resize 144x144 drawable-xxhdpi/yourimage.png
    
Here's a bash script that does the conversion, call it via "bash convert.sh 72 yourimage.png youroutputimage.png" where 72 is the size you want the xxhdpi image.
    
    echo Converting $2 into $3 into the drawable directories.
    
    float_scale=2
    function float_eval()
    {
        local stat=0
        local result=0.0
        if [[ $# -gt 0 ]]; then
            result=$(echo "scale=$float_scale; $*" | bc -q 2>/dev/null)
            stat=$?
            if [[ $stat -eq 0  &&  -z "$result" ]]; then stat=1; fi
        fi
        echo $result
        return $stat
    }
    
    m=$(float_eval "$1 / 3")
    h=$(float_eval "$1 / 2")
    x=$(float_eval "$1 / 1.5")
    xx=$(float_eval "$1")
    
    convert $2 -resize ${m}x${m} drawable-mdpi/$3
    convert $2 -resize ${h}x${h} drawable-hdpi/$3
    convert $2 -resize ${x}x${x} drawable-xhdpi/$3
    convert $2 -resize ${xx}x${xx} drawable-xxhdpi/$3
