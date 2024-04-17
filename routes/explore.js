const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Blog = require("../models/blog");

router.get("/", async (req, res) => {
    const articles= await Blog.find();
    res.render("explore/explore", {articles});
}); //to homepage   

module.exports = router;