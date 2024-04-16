const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Blog = require("../models/blog");

router.get("/", (req, res) => {
    res.render("login/index"); // ejs handling
});

router.post("/", async (req, res) => {
    const { username, password } = req.body;
    
    const user = await User.findOne({ username });
    
    if (!user || !(password === user.password)) {
      return res.send("Invalid username or password!");
    }
    req.session.username = username; //menandakan session dibangun
    res.redirect("/home");
});

module.exports = router;