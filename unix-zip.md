Title: Unix commands: zip
Tags: unix|unix-zip
Author: Denevell

To unzip a file

     unzip file.zip -d directory

The directory is important, else it'll put everything in the current directory.

If you just want to list files

     unzip -l file.zip

The next will zip up two files and one directory.

     zip newzip.zip afile afile1 ordirectory

You need the -r flag to make it recursively process the directory.

