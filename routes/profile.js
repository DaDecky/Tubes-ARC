const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Blog = require("../models/blog");
const upload = require('../multer.js');

router.get("/", async (req, res) => {
    const currentName = req.session.username; //get username
    const user = await User.findOne({ username: currentName });
    res.render("/profile/index", { user: user });
}); //get profile tab

router.put("/", upload.single("hello"), async (req, res) => {
// router.put("/", async (req, res) => {
    const currentName = req.session.username;
    const currentUser = await User.findOne({ currentName });
    //---------updating VVV-----------------------------
    currentUser.name = req.body.name;
    currentUser.bio = req.body.bio;
    currentUser.pfp = req.body.pfp;
    //--------------------------------------------------
    await currentUser.save();
    res.redirect("/profile");
}); // update profile

module.exports = router;