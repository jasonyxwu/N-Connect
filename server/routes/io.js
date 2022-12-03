const _ = require('underscore');
var Message=require('../models/message.js');
const userData = require('./users.json');
const USER_STATUS = ['ONLINE', 'OFFLINE'];
const users = {};

module.exports = server => {
  const io = require('socket.io')(server);

  io.on('connection', socket => {
    socket.on('online', username => {
      socket.username = username;
      users[username] = {
        socketId: socket.id,
        status: USER_STATUS[0]
      };
    })


    
    socket.on('chat', (params, fn) => {
        //还没改
        
        var receiver=params.receiver;
        var date=new Date();
        var time=date.toJSON();
   
        if (params.UserId== null || params.GroupId==null) {
            return res.status(400).send({ message:  "Empty user or group",
            data: null
            });
        }
        var message = new Message({
            DateCreated: time, 
            Content: params.Content,
            Sender: params.UserId,
            ToGroup: params.GroupId
          })
        
        message.save().then(result=>{
            return res.status(201).send({ message:  "Created",
            data: result
            });
        })
        .catch(result=>{
            return res.status(500).send({ message:  "server error",
            data: null
            });
        })
        //end


      const receiver = users[params.receiver];
      params.createTime = moment().format('YYYY-MM-DD HH:mm:ss');
      const senderData = _.findWhere(userData, { username: params.sender });
      params.senderPhoto = (senderData || {}).photo;

      if (!params.senderPhoto) {
        const senderLen = params.sender.length;
        params.senderPhotoNickname = params.sender.substr(senderLen - 2)
      } 

      fn(params);

      if (receiver && receiver.status === USER_STATUS[0]) {
        socket.to(users[params.receiver].socketId).emit('reply_private_chat', params);
      } 
    });

    socket.on('disconnect', reason => {
      console.log('disconnect: ', reason);
      
      if (users[socket.username]) {
        users[socket.username].status = USER_STATUS[1];
      }
    });
  });
}