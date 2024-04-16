import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.render(
    "root",
    req.user ? { username: req.user.username } : { username: null }
  );
});

export default router;
