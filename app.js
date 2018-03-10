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
    User        = require("./models/user"),
    seedDB      = require("./seeds")
    
//requiring routes
var commentRoutes    = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index")
 
//just printing the name of our development db to see if our environment variables work  
//console.log(process.env.DATABASEURL);

//this is the name of our mongodb database   
//mongodb://sarnava:joymohunbagan@ds135956.mlab.com:35956/yelpcamp_s1



//this is the environment variable part
//var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp_v12";
//mongoose.connect(url);
mongoose.connect("mongodb://sarnava:password1997@ds263948.mlab.com:63948/yelpcamp");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// seedDB(); //seed the database which we are not doing here..it was initially 
//written so that we have some dummy data to play with

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