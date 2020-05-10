var express      = require("express"),
    router       = express.Router({mergeParams: true}),
    Kwiat        = require("../models/kwiat"),
    Comment      = require("../models/Comment"),
    middleware   = require("../middleware/index.js");

//  COMMENTS ROUTES =====================================================

router.get("/new",middleware.isLoggedIn, function(req, res){

      Kwiat.findById(req.params.id, function(err, foundKwiat){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {kwiaty:foundKwiat});
        }
    });
});
    
router.post("/",middleware.isLoggedIn, function(req, res) {

    Kwiat.findById(req.params.id, function(err, foundKwiat){
        if(err){
            console.log(err);
            redirect("/kwiaty");
        } else { 
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                    redirect("/kwiaty");
            } else {
                comment.author.id = req.user._id;
                comment.author.username = req.user.username;
                // save comment
                comment.save();
                foundKwiat.comments.push(comment);
                foundKwiat.save();
                res.redirect("/kwiaty/" + foundKwiat.id)
            }}
            );
        }
    });
});


// EDIT    ======================================================================
router.get("/:comment_id/edit",middleware.isAuthorized, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            console.log(err);
            res.redirect("back")
        } else { 
            res.render("comments/edit", {kwiaty_id:req.params.id, comment:foundComment});
        }
    });
});

router.put("/:comment_id",middleware.isAuthorized, function (req,res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
       if(err){
        res.redirect("back")
       } else {
        res.redirect("/kwiaty/" + req.params.id);
       }
   }) 
});


// DELETE ======================================================================
router.delete("/:comment_id",middleware.isAuthorized, function(req, res) {
Comment.findByIdAndDelete(req.params.comment_id, function(err){
    if(err){
       res.redirect("back")    
    } else {
        res.redirect("back");
    }

});
});

module.exports = router;