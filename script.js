const express = require("express");
const ejs = require("ejs");

const connectDB = require("./models/db");
const User = require("./models/dbusers");
const Posts = require("./models/dbposts");
const session = require("express-session");

const PORT = 3000;

const app = express();

connectDB();
// TO DO LIST: try, catch(error) for most
// mongoDB Validator
// SIGN UP

//-------------------middleware--------------------------------
// app.use(express.static('features')) // for sendFile(), irrelevant switc to ejs;

app.set("view engine", "ejs"); //pick ejs as view engine

app.set("views", __dirname + "/features/feature-1"); //pick folder for ejs

app.use(
  session({ secret: "blogsecretkey", resave: false, saveUninitialized: false })
); //session middleware

app.use((req, res, next) => {
  if (req.path !== "/login") {
    if (req.session && req.session.username) {
      next();
    } else {
      res.redirect("login");
    }
  } else {
    next();
  }
}); //if no session, send back to login

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
}); //prints out html requests

//------------login---------------
app.get("/login", (req, res) => {
  res.render("login/index"); // ejs handling
});
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user || !(password === user.password)) {
    return res.send("Invalid username or password!");
  }
  req.session.username = username; //menandakan session dibangun
  res.redirect("/home");
});
//---------------home------------------------
app.get("/home", (req, res) => {
  res.redirect("/");
}); //for mistaken people
app.get("/", (req, res) => {
  res.render("homepage/index");
}); //to homepage
app.delete("/:id", async (req, res) => {
  const blogId = req.params.id;
  await Posts.findByIdAndDelete(blogId); // delete
  res.redirect("/home");
}); //to delete

//---------------blogs--------------------------
app.get("/blogs", (req, res) => {
  res.render("blogs/index");
}); //list of blogs

app.get("/blogs/:id", async (req, res) => {
  const blogId = req.params.id;
  res.render("blogs/index", { id: blogId });
}); //sends the specific blog Id through a query parameter, that would be checked by javascript in the index.html, fetch with mongodb (WOULD BE EASIER WITH EJS)

//---------------form------------------------
app.get("/form", (req, res) => {
  res.render("/form/index");
}); //send to form

app.post("/form", async (req, res) => {
  const currentName = req.session.username;
  const user = await User.findOne({ currentName }); //to get _id
  const currentDate = new Date(); //to get current date

  const blogData = new Posts({
    title: req.body.title,
    content: req.body.content,
    author: user._id,
    short_description: req.body.desc,
    publish_date: currentDate,
  });
  await blogData.save(); //save
  res.redirect("/form");
}); //post request form

app.put("/form/:id", async (req, res) => {
  const blogId = req.params.id;
  const currentBlog = await Posts.findOne({ _id: blogId });
  //---------updating VVV----------------------
  currentBlog.title = req.body.title;
  currentBlog.content = req.body.content;
  currentBlog.short_description = req.body.desc;
  //-------------------------------------------
  await currentBlog.save();
  res.redirect("/form");
}); //edit request form

//---------------profile-------------------------------
app.get("/profile", async (req, res) => {
  const currentName = req.session.username; //get username
  const user = await User.findOne({ currentName });
  res.render("/profile/index", { id: user._id });
}); //get profile tab

app.put("/profile", async (req, res) => {
  const currentName = req.session.username;
  const currentUser = await User.findOne({ currentName });
  //---------updating VVV-----------------------------
  currentUser.name = req.body.name;
  currentUser.bio = req.body.bio;
  //--------------------------------------------------
  await currentUser.save();
  res.redirect("/form");
}); // update profile
//------------------------------------------------------
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
