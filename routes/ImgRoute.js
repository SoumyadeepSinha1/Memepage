var express=require("express");
var router=express.Router();
var MemeBase=require("../models/Meme");
var User=require("../models/User");
router.get("/",function(req,res){
    MemeBase.find({},function(err,memes){
        if(err)
        {console.log(err);}
        else
        {res.render("plane.ejs",{memes:memes});}
    });
});
router.get("/:id/view",function(req,res){
    MemeBase.findById(req.params.id,function(err,foundMeme){
        if(err)
        {console.log(err);}
        else
        {
            MemeBase.find({"userid":foundMeme.userid,"_id":{$ne:foundMeme._id}},function(err,memes){
                if(err)
                {
                    console.log(memes);
                }
                else
                {res.render("display.ejs",{thisMeme:foundMeme,memes:memes});}
            })
            
        }
    });
});
router.get("/categories/:type",function(req,res){
    MemeBase.find({"category":req.params.type},function(err,memes){
        if(err)
        {console.log(err);}
        else
        {res.render("plane.ejs",{memes:memes});}
    });
});
router.get("/search",function(req,res){
    var search=req.query.search;
    MemeBase.find({$or:[{name:{$regex:search,$options:'i'}},{name:{$regex:search.replace(/\s/g,''),$options:'i'}},{category:{$regex:search,$options:'i'}},{category:{$regex:search.replace(/\s/g,''),$options:'i'}}]},function(err,memes){
        if(err)
        {console.log(err);console.log(search);}
        else
        {res.render("plane.ejs",{memes:memes});}
    });
});
router.get("/new",isLoggedIn,function(req,res){
    res.render("new.ejs");
});
router.post("/new",isLoggedIn,function(req,res){
    MemeBase.create({name:req.body.name,image:req.body.image,category:req.body.category,userid:req.user.id},function(err,newpost){
        User.findById(req.user.id,function(err,foundUser){
            if(err){
                console.log(err);
            } else{
                foundUser.images.push(newpost);
                foundUser.save();
            }
        });
    });
    res.redirect("/");
}); 
//AUTH ROUTES

function isLoggedIn(req,res,next){
    if(req.isAuthenticated())
    {return next();}
    res.redirect("/login");
}

module.exports=router;