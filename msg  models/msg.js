var mongo=require('mongoose');
var schema=mongo.Schema;
var msgSchema=new schema({
    msg:String,
    time:String,
    date:String,
    sent:Boolean,
    owner:String,
    person:String
});

var msg=mongo.model('msg',msgSchema);
module.exports=msg;