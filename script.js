const express = require("express");
const ejs = require("ejs");


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

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
}); //prints out html requests

//------------API-------------------
app.use('/login', loginRoute);
app.use('/home', homeRoute);
app.use('/blog', blogRoute);
app.use('/form', formRoute);
app.use('/profile', profileRoute);
app.use('/explore', exploreRoute);
app.use('/myblogs', myblogsRoute);

app.get("/", (req, res) => {
    res.redirect("/home");
  }); //for mistaken people

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});