//this is just the beginning....huge no of features to come soon
//here we are requiring the libraries of node.js
var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user");
    
    
//requiring routes
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index");
///////////////////////////////////////////////////////////////////////////////////////////////

//this is the environment variable part
//var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp_v12";
//mongoose.connect(url);

var url=process.env.DATABASEURL || "mongodb://localhost/yelp_camp_v12";
mongoose.connect(url);
//THE ENVIRONMENT VARIABLE CONCEPT ENDS HERE!!!!!!!!!!!!!!!!!!!!!!
//TO KNOW MORE ABOUT THIS CONCEPT CHECK OUT THE VIDEOS 
///////////////////////////////////////////////////////////////////////////////////////////////
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());


//Now moment is available for use in all of your view files via the variable named moment
app.locals.moment = require('moment');

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Sarnava is the best!!!!!!!!!!!!!!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);



app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The YelpCamp Server Has Started!");
});

