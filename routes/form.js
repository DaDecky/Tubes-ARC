const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Blog = require("../models/blog");
// const upload = require('../script');

router.get("/", (req, res) => {
    res.render("form/form", {blogData: new Blog()});
  }); //send to form
  
// router.get('/:id', (req, res) => {
//     res.send(req.params.id);
// });
// router.post("/", upload.single('picture'), async (req, res) => {
router.post("/", async (req, res) => {
   const currentName = req.session.username;
   const user = await User.findOne({ username: currentName }); //to get _id
   const currentDate = new Date(); //to get current date
   let blogData = new Blog({
     title: req.body.title,
     content: req.body.content,
     author: user._id,
     short_description: req.body.desc,
     publish_date: currentDate,
   });
   console.log("huh???");
   try{
    await blogData.save(); //save
    alert("Blog berhasil dipublish!");
    console.log("success!");
    res.redirect('/blog/${blogData.id}');
   } catch(err) {
    res.render('/form/form', {blogData: blogData});
    console.log("error");
   }
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