Title: Ant: Replacing text
Tags: ant|ant-replace
Date: 2012-12-07 14:15:59 -0500 
Author: Denevell

You can use Ant to replace tokens in a file with values. With hello.txt as:

 This is bullshit, really.

This target

     <target name="replace">
             <replace
                  file="hello.txt"
                  token="bullshit"
                  value="sunshine, lollipops"
                  summary="yes"
                  >
             </replace>
     </target>

Will ensure hello.txt now states:

     This is sunshine, lollipops, really.

This target will do the same, but will allow you to specify multiple replaces:

           <replace
                file="hello.txt"
                summary="yes"
                >
                <replacefilter
                        token="bullshit"
                        value="definitely sunshine and lollipops"/>
                <replacefilter
                        token="is"
                        value="really is"/>
           </replace>

You can specify a property file too. Such as secrets.txt:

     hiya=EVERYTHING NICE

And this command

     <replace
        file="hello.txt"
        propertyFile="secrets.txt"
        summary="yes"
     >
        <replacefilter
           token="bullshit"
           property="hiya"
        />
     </replace>

Will result in

 this is EVERYTHING NICE, really.
