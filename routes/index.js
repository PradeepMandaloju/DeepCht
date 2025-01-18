var express = require('express');
var router = express.Router();
var msg=require('../msg  models/msg');
var user=require('../user models/user');
var chat=require('../msg  models/chat');

//get all users
router.get('/',(req,res)=>{
  user.find({})
  .then((data)=>res.json(data))
  .catch((err)=>console.log(err))
});

//get single valid user
router.post('/getuser',(req,res)=>{
  var {userName}=req.body;
  user.findOne({userName:userName})
  .then((data)=>res.json(data))
  .catch((err)=>console.log(err))
});

//register user
router.post('/reg',(req,res)=>{
  var userName=req.body.userName;
  user.findOne({userName:userName}).select("userName")
  .then((data)=>{if(data==null){
    var newuser=new user(req.body);
    newuser.save()
  .then(()=>res.send("Registered Successfully!"))
  .catch((err)=>console.log(err))
  }
  else{
    res.send("UserId already exists")
  }
  })
  .catch((err)=>console.log(err));
  });



//Get Login User Details
router.post('/login',(req,res)=>{
  var {userName,userPassword}=req.body;
  user.findOne({userName:userName}).select("userPassword")
  .then((data)=>{if(data==null){
    res.send('User Not Found');
  }
  else{
    if(data.userPassword==userPassword){
      res.send("Login Success!");
    }
    else{
      res.send("Wrong Password!");
    }
  }
})
.catch((err)=>console.log(err));
});


//get all chats
router.get('/chats',(req,res)=>{
  chat.find({})
  .then((data)=>res.json(data))
  .catch((err)=>console.log(err))
});


//get single person chats
router.post('/getchatsof',(req,res)=>{
  var {owner}=req.body;
  chat.find({owner:owner})
  .then((data)=>res.json(data))
  .catch((err)=>console.log(err))
});


//get single owner, person details
router.post('/getchatsdtlsof',(req,res)=>{
  var {_id}=req.body;
  chat.findOne({_id:_id})
  .then((data)=>res.json(data))
  .catch((err)=>console.log(err))
});



//add chat
router.post('/addchat',(req,res)=>{
  var owner=req.body.owner;
  var person=req.body.person;

  chat.findOne({owner:owner,person:person})
  .then((data)=>{if(data==null){
    var chats = new chat(req.body);
    chats.save()
    .then(()=>res.json(chats))
    .catch((err)=>console.log(err))
  }
  else{
    res.json(data)
  }
  })
  .catch((err)=>console.log(err));
  });


  router.put('/update/:id',(req,res)=>{
    let Id=req.params.id;
    let updateddata=req.body;
    chat.updateOne({_id:Id},updateddata)
    .then((result)=>{
      if(result.modifiedCount>0)
        res.send("last seen Updated")
      else
        res.send("Data not found!")
    })
    .catch((err)=>console.log(err))
    });

// router.post('/addchat',(req,res)=>{
//   var chats = new chat(req.body);
//   chats.save()
//   .then(()=>res.send("data added"))
//   .catch((err)=>console.log(err))
// });



//dlt chat
router.delete('/delchat/:id',(req,res)=>{
  let Id=req.params.id;
  chat.deleteOne({_id:Id})
  .then((result)=>{
    if(result.deletedCount>0)
      res.send("deleted")
    else
      res.send("not found!")
  })
  .catch((err)=>console.log(err))
});



//add msg
router.post('/addmsg',(req,res)=>{
  var amsg = new msg(req.body);
  amsg.save()
  .then(()=>res.send("data added"))
  .catch((err)=>console.log(err))
});

//get msgs
router.get('/getmsg',(req,res)=>{
  msg.find({})
  .then((data)=>res.json(data))
  .catch((err)=>console.log(err))
});

//get single person msgs
router.post('/getmsgsof',(req,res)=>{
  var {owner,person}=req.body;
  msg.find({owner:owner,person:person})
  .then((data)=>res.json(data))
  .catch((err)=>console.log(err))
});




//dlt msg
router.delete('/delmsg/:id',(req,res)=>{
  let Id=req.params.id;
  msg.deleteOne({_id:Id})
  .then((result)=>{
    if(result.deletedCount>0)
      res.send("deleted")
    else
      res.send("not found!")
  })
  .catch((err)=>console.log(err))
});






module.exports = router;
