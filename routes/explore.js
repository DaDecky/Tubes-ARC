const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Blog = require("../models/blog");

router.get("/", (req, res) => {
    const articles=[
        {
            title: 'TITLE',
            date: new Date(),
            desc: 'Dexription'
        },
        {
            title: 'TITLE2',
            date: new Date(),
            desc: 'Description'
        },
        {
            title: 'TITLE3',
            date: new Date(),
            desc: 'Description'
        }
    ]
    res.render("explore/explore", {articles});
}); //to homepage   

module.exports = router;