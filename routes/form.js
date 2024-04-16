const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Blog = require("../models/blog");
const upload = require('../multer.js');


router.get("/", (req, res) => {
    res.render("/form/index");
  }); //send to form
  
router.post("/", upload.single('picture'), async (req, res) => {
// router.post("/", async (req, res) => {
   const currentName = req.session.username;
   const user = await User.findOne({ username: currentName }); //to get _id
   const currentDate = new Date(); //to get current date
  
   const blogData = new Blog({
     title: req.body.title,
     content: req.body.content,
     author: user._id,
     short_description: req.body.desc,
     publish_date: currentDate,
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
});//handle delete

module.exports = router;