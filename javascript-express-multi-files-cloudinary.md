title: Upload muliple file to Cloudinary with multer
tags: javascript, expressjs

Let's say we have some FormData and some files you've found with `<input type="file">`.

```
    var formData = new FormData()
    formData.append("name", "hi")
    formData.append("image", file1)
    formData.append("image", file2)
```

And you send that data up using `fetch` or similar.

Then in your express server, let's setup cloudinary and multier:

```
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const upload = multer({ dest: 'uploads/' })

cloudinary.config({ 
  cloud_name: 'xxx', 
  api_key: 'xxx', 
  api_secret: 'xx' 
});

var parser = multer({ 
  storage: cloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'xxx',
    filename: function (req, file, cb) {
      cb(undefined, file.originalname);
    }
  })
});
```

We've setup cloudinary and multer with multer-storage-cloudinary.

Now let's make the route with the multer middleware.

```
router.post('/uploadImages', parser.array('image'), (req, res, next) => {
  console.log(req.files)
  // req.files will show you the uploaded files
  // and req.body will show you the rest of your form data
  res.json("done")
})
```
