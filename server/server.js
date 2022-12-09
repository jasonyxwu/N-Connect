module.exports = ()=>{}
const { Socket } = require('dgram');

// Get the packages we need
var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    secrets = require('./config/secrets'),
    bodyParser = require('body-parser');
mongoose.set('useFindAndModify', false)
// Create our Express application
var app = express();
//Socket.io 服务器
const { createServer } = require("https");
const httpServer = createServer(app);


// Use environment defined port or 4000
var port = process.env.PORT || 8080;

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
//app.listen(port);

app.start = app.listen = function(){
    return httpServer.listen.apply(httpServer, arguments)
  }
  
  app.start(port)
console.log('Server running on port ' + port);



/** 
io.on("connection", (socket) => {
  // ...
});

httpServer.listen(port1);

var server = require('http').Server(app);
var io=require('socket.io')( {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      allowedHeaders: ["chat", "init","disconnect"],
      credentials: true
    },
    noServer: true });*/
//server.listen(port1);
//httpServer.listen(port1);
const io = require('socket.io')(httpServer, {
    allowEIO4:true,
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["chat", "init","disconnect"],
      credentials: true
    }});
//const expressStatusMonitor = require('express-status-monitor');
//app.use(expressStatusMonitor({ websocket: io, port: app.get('port') })); 
require('./routes/io.js')(io);

module.exports = app;