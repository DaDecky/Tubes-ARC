const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    const currentName = req.session.username; //get username
    const user = await User.findOne({ currentName });
    res.render("/profile/index", { id: user._id });
}); //get profile tab

router.put("/", async (req, res) => {
    const currentName = req.session.username;
    const currentUser = await User.findOne({ currentName });
    //---------updating VVV-----------------------------
    currentUser.name = req.body.name;
    currentUser.bio = req.body.bio;
    //--------------------------------------------------
    await currentUser.save();
    res.redirect("/form");
}); // update profile

module.exports = router;