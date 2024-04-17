import express from "express";
import User from "../../models/user.mjs";
import Blog from "../../models/blog.mjs";
import upload from "../../multer.mjs";

const router = express.Router();

router.get("/profile", async (req, res) => {
  if (!req.user) {
    req.flash("error", "You need to login first!");
    return res.redirect("/login");
  }
  const currentName = req.user.username; //get username
  const user = await User.findOne({ username: currentName });
  res.render("/profile", { user: user });
}); //get profile tab

// router.put("/api/profile", upload.single("hello"), async (req, res) => {
router.put("/api/profile", async (req, res) => {
  if (!req.user) {
    req.flash("error", "You need to login first!");
    return res.redirect("/login");
  }
  const currentName = req.user.username;
  const currentUser = await User.findOne({ username: currentName });
  //---------updating VVV-----------------------------
  currentUser.username = req.body.name;
  currentUser.bio = req.body.bio;
  currentUser.pfp = req.body.pfp;
  //--------------------------------------------------
  await currentUser.save();
  res.redirect("/profile", { user: user });
}); // update profile

export default router;
