// DEPENDANCIES =====================================================
var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require("mongoose"),
    passport        = require("passport"),
    flash           = require("connect-flash"),
    LocalStrategy   = require("passport-local"),
    User            = require("./models/user")
    Comment         = require("./models/Comment"), 
    seedDB          = require("./models/seeds"),
    methodOverride  = require("method-override");

// ==================================================================

// var url = process.env.DATABASEURL || "mongodb://localhost/kwiaty"
// // mongoose.connect(url, {
mongoose.connect("mongodb+srv://dandeusz:o45pZ6QLxnV0aNKw@cluster0-3t3pj.mongodb.net/test?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}).then(() => {
    console.log("Connected to DB!");
}).catch(err => {
    console.log("ERROR:", err.message);
});


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();
// PASSPORT CONFIGURATION ===========================================
app.use(require("express-session")({
    secret: "something difficult to guess",
    resave: false, 
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// AUTH ROUTES ======================================================
//
// ==================================================================
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error       = req.flash("error");
    res.locals.success     = req.flash("success");
    next();
});
// ==================================================================
app.use(authRoutes);
app.use(kwiatyRoutes);
app.use("/kwiaty/:id/comments", commentRoutes);
// ==================================================================
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        
        return next();
    }
    res.render("login");
}
//  =======================================================================
// app.listen(process.env.PORT, process.env.IP, () => {
//     console.log("server listening on port ?");
// });


var port = process.env.PORT || 3000;
app.listen(port,process.env.IP, function () {
console.log("Server Has Started!");
});
// ==================================================================