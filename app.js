var express=require("express");
var app=express();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");
var passport=require("passport");
var LocalStrategy=require("passport-local");    
var User=require("./models/User");
var MemeBase=require("./models/Meme");

var imgroute=require("./routes/ImgRoute");
var userroute=require("./routes/UserRoute");

mongoose.connect("mongodb://localhost/Memepage_app", {useNewUrlParser:true});
process.on('uncaughtException',function(err){
    console.log(err);
});
app.use(bodyParser.urlencoded({extended:true}));

MemeBase.create({name:"Harley Davidson", image: "https://images.unsplash.com/photo-1558981852-426c6c22a060?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",category:"movies"});
MemeBase.create({name:"John Fowler", image: "https://images.unsplash.com/photo-1560382797-66b2d275cb56?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",category:"TV Series"});
MemeBase.create({name:"Books", image:"https://images.unsplash.com/photo-1560406146-78f8cb5e0fbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",category:"General Template"});
MemeBase.create({name:"Payment method", image:"https://images.unsplash.com/photo-1556742031-c6961e8560b0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",category:"General Template"});
MemeBase.create({name:"My Car", image:"https://images.unsplash.com/photo-1560392711-cc5ffe0ea057?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",category:"Movies" });
MemeBase.create({name:"Dream Home", image: "https://images.unsplash.com/photo-1560406145-f34b88bff872?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",category:"TV Series"});
MemeBase.create({name:"Subway", image: "https://images.unsplash.com/photo-1560410779-a931d1981ba8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",category:"General Template"});
MemeBase.create({name:"Desert", image:"https://images.unsplash.com/photo-1560336767-7447ab89afb6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",category:"TV Series"});
MemeBase.create({name:"Empire State Building", image:"https://images.unsplash.com/photo-1560268765-84c5eb82fe8a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",category:"Movies"});
MemeBase.create({name:"Mountaineering", image:"https://images.unsplash.com/photo-1560345573-9f453083c335?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",category:"General Template"});
MemeBase.create({name:"Veronica", image:"https://images.unsplash.com/photo-1560384585-1769da827390?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",category:"TV Series"});
MemeBase.create({name:"Shining in the sailing sun", image:"https://images.unsplash.com/photo-1560389667-de69f0a9ead4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",category:"Movies"});
MemeBase.create({name:"My Childhood", image:"https://i.ibb.co/k0QdsHN/74911460-1845064215640414-2206013447970226176-o.jpg", category:"Movies"});
app.use(require("express-session")({
    secret:"form submission",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    next();
});

app.use(imgroute);
app.use(userroute);

app.listen(2000,function(){
    console.log("Server active at port 2000");
});