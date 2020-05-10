var express      = require("express"),
    router       = express.Router({mergeParams: true}),
    middleware   = require("../middleware/index.js");

router.get("/", function (req,res){
    res.render("landing.ejs");
});
router.get("/home", function (req,res){
    res.render("home.ejs");
});

module.exports = router;