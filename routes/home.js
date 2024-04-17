const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Blog = require("../models/blog");

router.get("/", async (req, res) => {
    const articles= await Blog
        .find()
        .sort({_id: 1})
        .limit(3);
    const username = req.user ? req.user.username : null;
    res.render("homepage/index", {articles: articles, username: username});
}); //to homepage   


module.exports = router;