title: NodeJS: Increase allocated memory
tags: nodejs,javascript
date: Oct 4, 2017

You may find NodeJS crashes due to lack of memory. You can increase it as follows (to 6gb): 

```node --max-old-space-size=6144```
