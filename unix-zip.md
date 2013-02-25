Title: Unix commands: zip
{{wl-tags:unix|unix-zip}}{{wl-publish: 2012-12-04 08:59:29 -0500 | Denevell }}

To unzip a file

     unzip file.zip -d directory

The directory is important, else it'll put everything in the current directory.

The next will zip up two files and one directory.

     zip newzip.zip afile afile1 ordirectory

You need the -r flag to make it recursively process the directory.

