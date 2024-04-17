const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Blog = require("../models/blog");

router.get("/", async (req, res) => {
    const page = req.query.p || 0;
    const articlesPerPage = 6;
    const articles= await Blog
        .find()
        .sort({_id: 1})
        .skip(page*articlesPerPage)
        .limit(articlesPerPage);
    var pageCount = await Blog.countDocuments();
    pageCount = (pageCount-1)/articlesPerPage;
    const pageInt = parseInt(page);
    const next_page = pageInt < pageCount ? `/explore?p=${(parseInt(page)+1)}` : '#';
    const prev_page = pageInt >0 ? `/explore?p=${pageInt-1}` : '#';
    res.render("explore/explore", {articles: articles, next_page:next_page, prev_page:prev_page});
}); //to homepage   

module.exports = router;