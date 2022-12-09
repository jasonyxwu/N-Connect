const { Socket } = require('dgram');

// Get the packages we need
var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    secrets = require('./config/secrets'),
    bodyParser = require('body-parser');

    
    //const httpServer = createServer();    
mongoose.set('useFindAndModify', false)
// Create our Express application
var app = express();
//Socket.io 服务器
//var server = require('http').Server(app);

import { createServer } from "http";
import { Server } from "socket.io";
const httpServer = createServer();
const io = new Server(httpServer, {
  path: "https://n-connect.vercel.app/"
});
/**const httpServer = createServer();
var io=require('socket.io')( {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      allowedHeaders: ["chat", "init","disconnect"],
      credentials: true
    },
    noServer: true });
**/
// Use environment defined port or 4000
var port = process.env.PORT || 4000;
mongoose.set("useCreateIndex",true);
// Connect to a MongoDB --> Uncomment this once you have a connection string!!
mongoose.connect(secrets.mongo_connection,  { useNewUrlParser: true ,useUnifiedTopology: true });

// Allow CORS so that backend and frontend could be put on different servers
var allowCrossDomain = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
};
app.use(allowCrossDomain);

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Use routes as a module (see index.js)
require('./routes')(app, router);

// Start the server
app.listen(port);
console.log('Server running on port ' + port);

httpServer.listen(4001);
require('./routes/io.js')(io);
console.log('Server running on port ' + 4001);