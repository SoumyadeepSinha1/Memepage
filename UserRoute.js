var express=require("express");
var router=express.Router();
var MemeBase=require("../models/Meme");
var User=require("../models/User");
var passport=require("passport");
var LocalStrategy=require("passport-local");
//AUTH ROUTES
router.get("/register",function(req,res){
    res.render("register.ejs");
});
router.post("/register",function(req,res){
    User.register(new User({username:req.body.username}),req.body.password,function(err,user){
        if(err)
        {console.log(err);return res.render("register.ejs");}
        passport.authenticate("local")(req,res,function(){
            res.redirect("/");
        })
    });
});
router.get("/login",function(req,res){
    res.render("login.ejs");
});
router.post("/login",passport.authenticate("local",
    {
        successRedirect:"/",
        failureRedirect:"/login"
    }) ,function(req,res){
});
router.get("/logout",function(req,res){
    req.logout();
    res.redirect("/");
});
function isLoggedIn(req,res,next){
    if(req.isAuthenticated())
    {return next();}
    res.redirect("/login");
}

module.exports=router;