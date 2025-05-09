var createError = require('http-errors');
var mongo = require('mongoose');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var http = require('http'); // Use HTTP module
var socketIo = require('socket.io'); // Use Socket.IO module

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// MongoDB Model for storing messages (ensure you have the file `msg models/msg`)
var Message = require('./msg  models/msg'); // You will create this model separately

var app = express();

// Set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// MongoDB connection
// mongo.connect('mongodb://localhost:27017/ChtDeep')
//   .then(() => console.log("Connected to database"))
//   .catch((err) => console.log("Unable to connect to database", err));

mongo.connect("mongodb+srv://pradeepmandaloju686:Zu8N9bM2XLUr3UwU@cluster0.tr68o.mongodb.net/DeepCht")
.then(()=>console.log("Connected to database"))
.catch((err)=>console.log("Error",err));

// Create HTTP server and integrate Socket.IO
var server = http.createServer(app);
var io = socketIo(server, {
  cors: {
    origin: "*", // Allow cross-origin requests from any domain
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

// WebSocket connection and message handling
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);



  socket.on('sendMessage', (message) => {
    try {
      // Here you can save the message to the database if needed
  
      // Broadcast the message to all connected clients
      io.emit('newMessage', message);
    } catch (error) {
      console.error('Error processing message:', error);
    }
  });
  

  // Handle user disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Listen on a port
// var port = 3456;
// server.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });

// port=process.env.port || 6869;
// app.listen(port,(req,res)=>{
//   console.log(`server is running at http://localhost:${port}`);
// });
const port = process.env.PORT || 6869;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;



// var createError = require('http-errors');
// var mongo=require('mongoose');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
// var cors=require('cors');
// var http = require('http'); // Add this
// var socketIo = require('socket.io'); // Add this

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');


// // MongoDB Model for storing messages
// var Message = require('./msg  models/msg'); // You will create this file in step 3


// var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
// app.use(cors());
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);



// // MongoDB connection


// mongo.connect('mongodb://localhost:27017/ChtDeep')
// .then(() => console.log("Connected to database"))
// .catch((err) => console.log("Unable to connect to database", err));


// // Create HTTP server and integrate Socket.IO
// var server = http.createServer(app);
// var io = socketIo(server, {
//   cors: {
//     origin: "*", // Allow cross-origin requests
//     methods: ["GET", "POST","PUT","DELETE"]
//   }
// });

// // WebSocket connection and message handling
// io.on('connection', (socket) => {
//   console.log('A user connected:', socket.id);

//   // Listen for 'sendMessage' event from clients
//   socket.on('sendMessage', async (message) => {
//     try {
//       // Save the message to MongoDB
//       const newMessage = new Message({
//         text: message.text,
//         sender: message.sender,
//         receiver: message.receiver,
//         timestamp: new Date()
//       });
//       await newMessage.save();

//       // Broadcast the message to all clients
//       io.emit('newMessage', newMessage);
//     } catch (error) {
//       console.error('Error saving message:', error);
//     }
//   });

//   // Handle user disconnect
//   socket.on('disconnect', () => {
//     console.log('User disconnected:', socket.id);
//   });
// });




// // Listen on a port
// var port = 3456;
// app.listen(port,(req,res)=>{
//   console.log(`Server is runnig at http://localhost:${port}`);
// })

// mongo.connect('mongodb://localhost:27017/ChtDeep')
// .then(()=>console.log("Connted to database"))
// .catch((err)=>console.log("Unable to connect to database",err))


// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;






// var createError = require('http-errors');
// var mongo = require('mongoose');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
// var cors = require('cors');
// var http = require('http'); // Add this
// var socketIo = require('socket.io'); // Add this

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// // MongoDB Model for storing messages
// var Message = require('./msg  models/msg'); // You will create this file

// var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
// app.use(cors());
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // MongoDB connection
// mongo.connect('mongodb://localhost:27017/ChtDeep')
//     .then(() => console.log("Connected to database"))
//     .catch((err) => console.log("Unable to connect to database", err));

// // Create HTTP server and integrate Socket.IO
// var server = http.createServer(app);
// var io = socketIo(server, {
//     cors: {
//         origin: "*", // Allow cross-origin requests
//         methods: ["GET", "POST", "PUT", "DELETE"]
//     }
// });

// // WebSocket connection and message handling
// io.on('connection', (socket) => {
//     console.log('A user connected:', socket.id);

//     // Listen for 'sendMessage' event from clients
//     socket.on('sendMessage', async (message) => {
//         try {
//             // Save the message to MongoDB
//             const newMessage = new Message({
//                 text: message.text,
//                 sender: message.sender,
//                 receiver: message.receiver,
//                 timestamp: new Date()
//             });
//             await newMessage.save();

//             // Broadcast the message to all clients
//             io.emit('newMessage', newMessage);
//         } catch (error) {
//             console.error('Error saving message:', error);
//         }
//     });

//     // Handle user disconnect
//     socket.on('disconnect', () => {
//         console.log('User disconnected:', socket.id);
//     });
// });

// // Listen on a port
// var port = 3456;
// server.listen(port, () => {
//     console.log(`Server is running at http://localhost:${port}`);
// });

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};

//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });

// module.exports = app;
