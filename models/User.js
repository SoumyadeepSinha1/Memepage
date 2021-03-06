var mongoose=require("mongoose");
var passportLocalMongoose=require("passport-local-mongoose");
var UserSchema=new mongoose.Schema({
    name:String,
    username:String,
    password:String,
    images:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Memes"
    }]
});
UserSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model("User",UserSchema);
