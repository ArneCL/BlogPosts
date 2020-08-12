Title: Ant: Timestamps
Tags: java-ant|java-ant-date|java
Date: 2012-12-04 13:14:26 -0500 

You can set the format of a timestamp as follows:

     <tstamp>
      <format pattern="yyyy-MM-dd-HH-mm-ss" property="TIME_STAMP"/>
     </tstamp>

And then echo it as a ${TIME_STAMP}.

The format is the same as Java's.
