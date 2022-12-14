var Message=require('../models/message.js');
var Group=require('../models/group.js');
var User=require('../models/user.js');

module.exports = io => {
  
  console.log("fasong")
  io.on('connection', socket => {
    console.log("lianjie")
    //加房间
    socket.on('init', (params) =>{
      socket.join("world");
      console.log("init"+params)//group好了记得改
      User.findById(params.id, function (err, temp) {
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
        console.log("init"+rooms);
        if (rooms==null){
          socket.emit('res',{ message: "good, no room",data: temp, status:"200"});
        }else{
            socket.join(rooms);
        socket.emit('res',{ message: "good",data: temp, status:"200"});
        }
        
      })
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
          socket.emit('res',{ message:  "Created",
            data: result,
            status:"201" 
            });
        })
        .catch(result=>{
          console.log(result)
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

