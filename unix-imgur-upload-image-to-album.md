title: Upload an image to an imgur album from the command line
tags: unix,imgur

First make sure you have a client id through registering at https://api.imgur.com/oauth2/addclient

Then make a command to create an album:

```
curl --request POST   --url https://api.imgur.com/3/album   --header 'authorization: Client-ID YOUR_CLIENT_ID'
```

This will return an anonymous public album. Note the 'deletehash' id in the below:

```
{"data":{"id":"SOME_ID","deletehash":"SOME_DELETE_HASH"},"success":true,"status":200}
```

The empty album is available at https://imgur.com/a/SOME_ID

Now let's upload an image to that album. Because it's public and anonymous we need to use the `deletehash` as the album ID:

```
curl --request POST   --url https://api.imgur.com/3/image   --header 'authorization: Client-ID YOUR_CLIENT_ID'   --header 'content-type: multipart/form-data;' -F "album=THE_DELETE_HASH" -F "image=@/PATH/TO/THE/IMAGE.png"
```

The json returned should say everything is okay. Upload a couple of images to that album and you should be able to see them at https://imgur.com/a/SOME_ID.

You can get a json response of all the images in that album through `curl --request GET   --url https://api.imgur.com/3/album/SOME_ID   --header 'authorization: Client-ID YOUR_CLIENT_ID'. It will include the array of images:

```
"images":[{"id":"ANOTHER_ID",... link":"https:\/\/i.imgur.com\/ANOTHER_ID.png"},...]
```

The `link` property is the direct link to the image without all the imgur.com html around it.

