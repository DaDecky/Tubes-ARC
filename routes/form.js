const express = require("express");
const router = express.Router();

app.get("/", (req, res) => {
    res.render("/form/index");
  }); //send to form
  
app.post("/", async (req, res) => {
   const currentName = req.session.username;
   const user = await users.findOne({ currentName }); //to get _id
   const currentDate = new Date(); //to get current date
  
   const blogData = new Blog({
     title: req.body.title,
     content: req.body.content,
     author: user._id,
     short_description: req.body.desc,
     publish_date: currentDate,
   });
   await blogData.save(); //save
   res.redirect("/form");
 }); //post request form
  
app.put("/:id", async (req, res) => {
    const blogId = req.params.id;
    const currentBlog = await blogs.findOne({ _id: blogId });
    //---------updating VVV----------------------
    currentBlog.title = req.body.title;
    currentBlog.content = req.body.content;
    currentBlog.short_description = req.body.desc;
    //-------------------------------------------
    await currentBlog.save();
    res.redirect("/home");
}); //edit request form

router.delete("/:id", async (req, res) => {
  const blogId = req.params.id;
  await blogs.findByIdAndDelete(blogId); // delete
  res.redirect("/home");
});

module.exports = router;