Title: Installing the 32bit multiarch compatibility
Tags: unix|unix-debian-ia32|unix-debian
Date: 2012-12-12 09:44:01 -0500 
Author: Denevell

To use a program compiled for 32 bit, the Android development tools for example, you need the ia32 compatibility package if you're using 64 bit.

First add i386 to your list of architectures, update apt-get then install ia32

     dpkg --add-architecture i386
     apt-get update
     apt-get install ia32-libs

If you need to install a 32 bit version of something, issue the command as normal but with :i386 appended:

     apt-get install libncurses5:i386

