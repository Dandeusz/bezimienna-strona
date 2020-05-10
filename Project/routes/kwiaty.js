var express      = require("express"),
    router       = express.Router({mergeParams: true}),
    Kwiat        = require("../models/kwiat"),
    middleware   = require("../middleware/index.js");

router.get("/", function (req,res){
    res.render("landing.ejs");
});
router.get("/kwiaty", function(req, res){
    // Get all kwiats from DB
    Kwiat.find({},function(err, allKwiaty){
        if(err){
            console.log(err)
        } else {
            res.render("kwiaty/index", {kwiaty:allKwiaty});
        };
    })
});
router.post("/kwiaty",middleware.isLoggedIn, function (req,res){
    // get data from form and add to kwiaty
    var name        = req.body.name;
    var image       = req.body.image;
    var description = req.body.description;
    var price       = req.body.price;
    var author      = {
        id: req.user._id,
        username: req.user.username
    }
    var newKwiat    = {name: name, image:image, description:description, price:price, author:author};
    // Create a new kwiat and save to DB
    Kwiat.create(newKwiat, function(err,newlyCreated){
        if(err)
        {console.log(err)}
        else {
            console.log(newlyCreated);
            res.redirect("/kwiaty");
        }
    });
});
//NEW - Show new form to create new kwiat   ============================
router.get("/kwiaty/new", middleware.isLoggedIn, function(req,res){
    
    res.render("kwiaty/new");
});
// ======================================================================
//SHOW - create new form to show details   ==============================
router.get("/kwiaty/:id", function(req,res){
    //find the kwiat with provided id
    Kwiat.findById(req.params.id).populate("comments").exec(function(err, foundKwiat){
        if(err){
            console.log(err)
        } else {
            res.render("kwiaty/show", {kwiaty:foundKwiat})
        }
    });
});
// ======================================================================
// EDIT =================================================================
router.get("/kwiaty/:id/edit",middleware.checkOwnership, function(req,res){
    if (req.isAuthenticated()){
        Kwiat.findById(req.params.id, function(err, foundKwiat){
            if (err){
                console.log(err);
            }else {
                    res.render("kwiaty/edit", {kwiaty:foundKwiat});
            }
           

        });
    }
});
router.put("/kwiaty/:id",middleware.checkOwnership, function (req,res){
// find and update the correct campground 
Kwiat.findByIdAndUpdate(req.params.id, req.body.kwiat, function(err, updatedKwiat){
    if(err){
        res.redirect("/kwiaty");
    } else {
        res.redirect("/kwiaty/" + req.params.id);
    }
});
});
// DESTROY =================================================================
router.delete("/kwiaty/:id",middleware.checkOwnership, function(req,res){
    
    Kwiat.findByIdAndDelete(req.params.id, function(err){
        if(err){
           res.redirect("/kwiaty/" + req.params.id);
        } else {
            res.redirect("/kwiaty");
        }
    
    });
});



module.exports = router;