import express from "express";
import User from "../models/user.mjs";
import Blog from "../models/blog.mjs";
import upload from "../multer.mjs";

const router = express.Router();

router.get("/profile", async (req, res) => {
  if (!req.user) {
    req.flash("error", "You need to login first!");
    return res.redirect("/login");
  }
  const currentName = req.user.username; //get username
  const user = await User.findOne({ username: currentName });
  res.render("profile", { user: req.user });
}); //get profile tab

// router.put("/api/profile", upload.single("hello"), async (req, res) => {
router.post("/api/profile", async (req, res) => {
  if (!req.user) {
    req.flash("error", "You need to login first!");
    return res.redirect("/login");
  }
  const currentName = req.user.username;
  // const currentUser = await User.findOne({ username: currentName });
  req.newData = {
    username: req.body.name,
    bio: req.body.bio,
    password: req.body.password,
  };

  // await User.findOneAndUpdate(
  //   { username: currentName },
  //   req.newData,
  //   { upsert: true },
  //   function (err, doc) {
  //     if (err) {
  //       return res.send(500, { error: err });
  //     }
  //     return res.send("Succesfully saved.");
  //   }
  // );
  User.updateOne(
    { username: currentName },
    {
      $set: {
        username: req.body.name,
        bio: req.body.bio,
        password: req.body.password,
      },
    }
  );

  // Update the user document
  // await currentUser.updateOne({
  //   username: req.body.name,
  //   bio: req.body.bio,
  //   password: req.body.password,
  // });
  //---------updating VVV-----------------------------
  // currentUser.username = req.body.name;
  // currentUser.bio = req.body.bio;
  // currentUser.password = req.body.password;
  //--------------------------------------------------
  // await currentUser.updateOne();
  res.redirect("/profile");
}); // update profile

export default router;
