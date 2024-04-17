import express from "express";
const router = express.Router();
import User from "../../models/user.mjs";
import Blog from "../../models/blog.mjs";

router.get("/home", (req, res) => {
  res.redirect("/");
});

router.get("/", async (req, res) => {
  const blogs = await Blog.find().sort({ _id: -1 }).limit(3);
  const username = req.user ? req.user.username : null;
  res.render("homepage", { blogs, username });
  // const randomBlog = await Blog.aggregate([{ $sample: { size: 10 } }]);
  // if (req.user) {
  //   res.render("homepage", {
  //     username: req.user.username,
  //     blogs: randomBlog,
  //   });
  // } else {
  //   res.render("homepage", {
  //     blogs: randomBlog,
  //     username: null,
  //   });
  // }
}); //to homepage

export default router;
