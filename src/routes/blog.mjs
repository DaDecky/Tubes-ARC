import express from "express";
import User from "../models/user.mjs";
import Blog from "../models/blog.mjs";
import upload from "../multer.mjs";
import mongoose from "mongoose";

const router = express.Router();

router.get("/blog", async (req, res) => {
  // if (!req.user) {
  //   req.flash("error", "You need to login first!");
  //   return res.redirect("/login");
  // }

  const Blogs = await Blog.find().sort({ _id: -1 }).limit();
  const blogId = Blogs[0]._id.toString();
  res.redirect("/blog/" + blogId);
}); //pull out a random blog

router.get("/blog/:id", async (req, res) => {
  // if (!req.user) {
  //   req.flash("error", "You need to login first!");
  //   return res.redirect("/login");
  // }
  const blogId = req.params.id; // string
  const blog = await Blog.findOne({ _id: new mongoose.Types.ObjectId(blogId) });
  const user = await User.findOne({ _id: blog.authorID });
  res.render("blog", { blog: blog, username: user.username });
}); //pull out blog

router.get("/createblog", (req, res) => {
  if (req.user) {
    res.render("createblog");
  } else {
    req.flash("error", "You must be logged in to create a blog");
    res.redirect("/login");
  }
  // res.render("createblog");
  // req.user ? res.render("createblog") : res.redirect("/login");
  // res.render("createblog");
}); //send to form

router.post("/api/blog/create", upload.single("photo"), async (req, res) => {
  if (!req.user) {
    req.flash("error", "You must be logged in to create a blog");
    return res.redirect("/login");
  }
  const findBlog = await Blog.findOne({ title: req.body.title });
  if (findBlog) {
    req.flash("error", "Blog with the same title already exists");
    return res.redirect("/createblog");
  }
  const newBlog = new Blog({
    title: req.body.title,
    content: req.body.content,
    authorID: req.user._id,
    short_description: req.body.short_description,
    publish_date: new Date(),
  });
  newBlog.save();
  req.flash("status", "Blog created successfully");
  res.redirect("/");
});

router.get("/editblog/:id", async (req, res) => {
  const blogId = req.params.id;
  const blog = await Blog.findOne({ _id: blogId });
  res.render("editblog", { blog: blog });
}); //send to form

router.post("/api/form", upload.single("picture"), async (req, res) => {
  // router.post("/", async (req, res) => {
  const currentName = req.user.username;
  const user = await User.findOne({ username: currentName }); //to get _id
  const currentDate = new Date(); //to get current date

  const blogData = new Blog({
    title: req.body.title,
    content: req.body.content,
    author: user._id,
    short_description: req.body.desc,
    publish_date: currentDate,
    picture: req.file.filename,
  });
  await blogData.save(); //save
  res.redirect("/form");
}); //post request form

// router.put("/:id", upload.single('picture'), async (req, res) => {
router.put("/:id", async (req, res) => {
  const blogId = req.params.id;
  const currentBlog = await Blog.findOne({ _id: blogId });
  //---------updating VVV----------------------
  currentBlog.title = req.body.title;
  currentBlog.content = req.body.content;
  currentBlog.short_description = req.body.desc;
  //-------------------------------------------
  await currentBlog.save();
  res.redirect("/home");
}); //edit request form

router.delete("/:id", async (req, res) => {
  const blogId = req.params.id;
  await Blog.findByIdAndDelete(blogId); // delete
  res.redirect("/home");
}); //handle delete

export default router;
