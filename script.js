const express = require("express");
const ejs = require("ejs");
const multer = require('multer');

const connectDB = require("./models/db.js");
const User = require("./models/user.js");
const Blog = require("./models/blog.js");
const session = require("express-session");

const PORT = 5500;

const app = express();

const blogRoute = require('./routes/blog.js')
const formRoute = require('./routes/form.js')
const homeRoute = require('./routes/home')
const loginRoute = require('./routes/login')
const profileRoute = require('./routes/profile')
const exploreRoute = require('./routes/explore')
const myblogsRoute = require('./routes/myblogs')

connectDB();
// TO DO LIST: try, catch(error) for most
// mongoDB Validator
// SIGN UP

//-------------------middleware--------------------------------
// app.use(express.static('features')) // for sendFile(), irrelevant switc to ejs;

app.use(express.static( "public" ) ); // display static images

app.set("view engine", "ejs"); //pick ejs as view engine

app.set("views", __dirname + "/features/feature-1"); //pick folder for ejs

app.use(
  session({ secret: "blogsecretkey", resave: false, saveUninitialized: false })
); //session middleware

// app.use((req, res, next) => {
//   if (req.path !== "/login") {
//     if (req.session && req.session.username) {
//       next();
//     } else {
//       res.redirect("/login");
//     }
//   } else {
//     next();
//   }
// });
//if no session, send back to login

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
console.log(upload)

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
}); //prints out html requests



//------------delete this----------- (debuging purposes)
app.get('/debug', (req, res) => {
  req.session.debugSession = { username: 'David' };
  const David = new User({
  name: req.session.username,
  email: 'david@lodianto.com',
  password: "balls",
  bio: "i love dick",
  pfp: "(path to img)"
  }); 
  David.save()
});
//---------------------------------

//------------API-------------------
app.use(express.urlencoded({extended: false}));
app.use('/login', loginRoute);
app.use('/home', homeRoute);
app.use('/blog', blogRoute);
app.use('/form', formRoute);

// app.use('/profile', profileRoute);

app.put("/profile", upload.single("pfp"), async (req, res) => {
  const currentName = req.session.username;
  const currentUser = await User.findOne({ currentName });
  //---------updating VVV-----------------------------
  currentUser.name = req.body.name;
  currentUser.bio = req.body.bio;
  currentUser.pfp = req.file.filename;
  await currentUser.save();
  res.redirect("/profile");
}); // update profile

app.use('/explore', exploreRoute);
app.use('/myblogs', myblogsRoute);

app.get("/", (req, res) => {
    res.redirect("/home");
  }); //for mistaken people

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

module.exports = { upload };