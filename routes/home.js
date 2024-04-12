const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("homepage/index");
}); //to homepage

router.delete("/:id", async (req, res) => {
    const blogId = req.params.id;
    await Posts.findByIdAndDelete(blogId); // delete
    res.redirect("/home");
}); //to delete

module.exports = router;