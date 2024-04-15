const express = require("express");
const router = express.Router();
const User = require("./models/user");
const Blog = require("./models/blog");

router.get("/", async (req, res) => {
    const currentName = req.session.username;
    const user = await User.findOne({ username: currentName });
    const userBlogs = await Blog.find({ author: user._id })
    res.render("/myblogs", { blogs: userBlogs })
});

module.exports = router;