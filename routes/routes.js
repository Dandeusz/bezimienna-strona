var express      = require("express"),
    router       = express.Router({mergeParams: true}),
    Kwiat        = require("../models/kwiat"),
    middleware   = require("../middleware/index.js");

router.get("/", function (req,res){
    res.render("landing.ejs");
});

module.exports = router;