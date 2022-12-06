var Message=require('../models/message.js');
var Group=require('../models/group.js');
var User=require('../models/user.js');

module.exports = server => {
  const io = require('socket.io')(server);

  io.on('connection', socket => {
    //加房间
    socket.on('init', (params) =>{
      socket.join("123");
      console.log("init"+params)
      /**User.findById(params.id, function (err, temp) {
        if (err) {
          if (err.status==404) {
            socket.emit('res',{ message:  "no found",data: null, status:"404" });
          }
          else{
            socket.emit('res',{ message:  "server error",data: null, status:"500"});
          }
        }
        if (temp==null) {
          socket.emit('res',{ message:  "no found",data: temp, status:"404"});
        }
        rooms=temp.FriendGroups.concat(temp.Groups)
        socket.join(rooms);
        socket.emit('res',{ message: "good",data: temp, status:"200"});
      })**/
    })
    
    //聊天
    socket.on('chat', (params) => {
      console.log(params)
        var receiver=params.GroupId;
        var date=new Date();
        var time=date.toJSON();
   
        if (params.UserId== null || params.GroupId==null) {
          socket.emit('res',{ message:  "Empty user or group",
            data: null,
            status:"400"            
            });
        }
        var message = new Message({
            DateCreated: time, 
            Content: params.Content,
            Sender: params.UserId,
            ToGroup: params.GroupId
          })
        
        message.save().then(result=>{
          console.log(receiver)
          socket.to(receiver).emit('chat', {
            DateCreated: time, 
            Content: params.Content,
            Sender: params.UserId,
            ToGroup: params.GroupId
          });
          socket.emit('chat', {
            DateCreated: time, 
            Content: params.Content,
            Sender: params.UserId,
            ToGroup: params.GroupId
          });
          /**socket.emit('res',{ message:  "Created",
            data: result,
            status:"201" 
            });**/
        })
        .catch(result=>{
          socket.emit('res',{ message:  "server error",
            data: null,
            status:"500" 
            });
        })
    });
    //断开
    socket.on('disconnect', reason => {
      console.log('disconnect: ', reason);
    });
  });
}