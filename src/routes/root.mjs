import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  // const user = req.user;
  // console.log("root");
  // console.log("tes");
  // await console.log(req.user);

  // console.log(req.user.bio);
  // await console.log(req.user.);

  // console.log(req.user);
  // res.send("OK");
  res.render(
    "root",
    req.user ? { username: req.user.username } : { username: null }
  );
});

export default router;
