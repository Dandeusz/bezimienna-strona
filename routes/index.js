var express = require("express"),
    router  = express.Router({mergeParams: true}),
    passport= require("passport"),
    User    = require("../models/user"),
    flash   = require("connect-flash");

// AUTH ROUTES ==========================================================
// REGISTER
router.get("/register", function (req,res){
    res.render("register");
});
router.post("/register", function (req,res) {
    if(req.body.password==req.body.passwordConfirm){
        var newUser = new User({username: req.body.username})
        User.register(newUser, req.body.password, function(err, user){
            if (err){
                console.log(err);
                return res.send(err)
            } else {
                passport.authenticate("local")(req, res, function(){
                    res.redirect("/home")
                });
            }
        });
    } else {
        req.flash("error", "Podane hasła nie są identyczne");
        res.redirect("back");

    }
});
// LOGIN 
router.get("/login", function (req,res){
    res.render("login");
});
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/home",
        failureRedirect: "/login",        
    })
    ,function (req, res){    
        req.flash("success", "Zalogowano");
});
// LOGOUT
router.get("/logout", function (req,res){
    req.logout();
    req.flash("Success", "Wylogowano");
    res.redirect("/home");
});

module.exports = router;