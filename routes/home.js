const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Blog = require("../models/blog");

router.get("/", (req, res) => {
    res.render("homepage/index");
}); //to homepage

module.exports = router;