Tags:  java|java-io
Date: 2012-11-15 16:18:15 -0500 
Author: Denevell

Since I keep forgetting here's how you get a stream from a URL into a BufferedReader (on which you can run readLine()):

    BufferedReader result = new BufferedReader(new  InputStreamReader(url.openStream()));

I hate Java's I/O. 


