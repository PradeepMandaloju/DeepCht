var mongo=require('mongoose');
var schema=mongo.Schema;
var userSchema=new schema({
    userName:String,
    userPassword:String,
    userEmail:String,
    userPhone:String,
    dp:String
})

var user=mongo.model('user',userSchema);
module.exports=user;