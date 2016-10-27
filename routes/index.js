var express = require("express");
var router = express.Router();
var mongojs = require('mongojs');

router.get("/", function(req, res, next){
    res.render("Index.html");
});

module.exports = router;