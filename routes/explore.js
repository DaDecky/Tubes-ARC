const express = require('express');
const { route } = require('./blog');
const router = express.Router();

router.get('/', (req,res) => {
    res.render('/explore');
});

module.exports = router;