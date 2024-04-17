import express from "express";
const router = express.Router();
import User from "../../models/user.mjs";
import Blog from "../../models/blog.mjs";

router.get("/", (req, res) => {
  res.render("login/index"); // ejs handling
});

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username: username });

  if (!user || !(password === user.password)) {
    return res.send("Invalid username or password!");
  }
  req.session.username = username; //menandakan session dibangun
  res.redirect("/home");
});

export default router;
