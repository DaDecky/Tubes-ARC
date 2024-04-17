import express from "express";
import User from "../models/user.mjs";
import Blog from "../models/blog.mjs";
const router = express.Router();

router.get("/myblogs", async (req, res) => {
  if (!req.user) {
    req.flash("error", "You need to login first!");
    return res.redirect("/login");
  }
  const currentName = req.user.username;
  const user = await User.findOne({ username: currentName });
  const userBlogs = await Blog.find({ authorID: user._id });
  console.log(userBlogs);
  res.render("myblogs", { blogs: userBlogs });
});
export default router;
