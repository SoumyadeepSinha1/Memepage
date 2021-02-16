var mongoose=require("mongoose");
var passportLocalMongoose=require("passport-local-mongoose");
var memeSchema=new mongoose.Schema({
    name:String,
    image:String,
    category:String,
    editor:Boolean,
    userid:String
});
module.exports=mongoose.model("Memes",memeSchema);