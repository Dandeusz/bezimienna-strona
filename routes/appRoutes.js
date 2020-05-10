var express      = require("express"),
    router       = express.Router({mergeParams: true}),
    middleware   = require("../middleware/index.js");

router.get("/movingImage", function (req,res){
    res.render("movingImage/movingImage.ejs");
});

module.exports = router;