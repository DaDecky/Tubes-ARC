const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("blogs/index");
  }); //list of blogs
  
router.get("/:id", async (req, res) => {
    const blogId = req.params.id;
    res.render("blogs/index", { id: blogId });
  }); //sends the specific blog Id through a query parameter, that would be checked by javascript in the index.html, fetch with mongodb (WOULD BE EASIER WITH EJS)
  
module.exports = router;