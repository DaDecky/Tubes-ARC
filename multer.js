const multer = require("multer")
const storage = multer.diskStorage({
    destination: function (req, file, cb){
      cb(null, './uploads')
    },
    filename: function(req, file, cb) {
      // Determine filename based on the type of file (profile picture or blog picture)
      let filename;
      if (req.body.userId) {
          // Profile picture: Use user ID as filename
          filename = 'profile_' + req.body.userId + '.jpg';
      } else if (req.body.blogId) {
          // Blog picture: Use blog ID as filename
          filename = 'blog_' + req.body.blogId + '.jpg';
      } else {
          // Default filename if neither user ID nor blog ID is provided
          filename = file.fieldname + '-' + Date.now() + '.jpg';
          console.log("err")
      }
      cb(null, filename);
    }
  });
    //enctype = "multipart/form-data"

const upload = multer({ storage })
module.exports = upload;