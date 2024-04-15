const express = require("express");
const router = express.Router();
const User = require("./models/user");
const Blog = require("./models/blog");

router.get("/", async (req, res) => {
    const randomBlog = await Blog.aggregate([{ $sample: { size: 1}}]);
    const blogId = randomBlog[0]._id;
    res.redirect('/blog/' + blogId);
  }); //pull out a random blog
  
router.get("/:id", async (req, res) => {
    const blogId = req.params.id;
    const blog = await Blog.findById(blogId);
    res.render("blog/index", { blog: blog });
  }); //pull out blog
  
module.exports = router;