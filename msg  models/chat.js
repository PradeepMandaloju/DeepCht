var mongo=require('mongoose');
var schema=mongo.Schema;
var chatSchema=new schema({
    owner:String,
    person:String,
    lastseen:Date,
    dp:String
});

var chat=mongo.model('chat',chatSchema);
module.exports=chat;