import express from "express";
const router = express.Router();
import User from "../../models/user.mjs";
import Blog from "../../models/blog.mjs";

router.get("/explore", async (req, res) => {
  // if (!req.user) {
  //   req.flash("error", "You need to login first!");
  //   return res.redirect("/login");
  // }
  const page = req.query.p || 0;
  const articlesPerPage = 6;
  const blogs = await Blog.find()
    .sort({ _id: 1 })
    .skip(page * articlesPerPage)
    .limit(articlesPerPage);
  var pageCount = await Blog.countDocuments();
  pageCount = (pageCount - 1) / articlesPerPage;
  const pageInt = parseInt(page);
  const next_page =
    pageInt < pageCount ? `/explore?p=${pageInt + 1}` : "#bottom";
  const prev_page = pageInt > 0 ? `/explore?p=${pageInt - 1}` : "#bottom";
  res.render("explore", {
    username: req.user ? req.user.username : null,
    blogs,
    next_page: next_page,
    prev_page: prev_page,
  });
});

export default router;
