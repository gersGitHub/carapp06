var express = require("express");
var router = express.Router();

router.get("/suppliers", function(req, res, next){
    res.send("SUPPLIER API");
});

module.exports = router;