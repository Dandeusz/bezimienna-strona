var flash           = require("connect-flash"),
    middlewareObj   = {};
    

middlewareObj.isAuthorized = function(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function (err, foundComment){
            if (err){
                res.redirect("back")
            } else {
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else {
                    res.redirect("back")
                }
            }
        });
    }
};
middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        next();
    } else {       
        req.flash("error", "Wymagane logowanie");
        res.render("login");
    }
};

middlewareObj.checkOwnership = function (req,res,next){
    if (req.isAuthenticated()){
        Kwiat.findById(req.params.id, function(err,foundKwiat){
            if(err){
                res.redirect("/kwiaty/" + req.params.id);
            } else {
                if(foundKwiat.author.id.equals(req.user.id)){
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });}   
     else {
        res.redirect("back")
    }
}

module.exports = middlewareObj;

