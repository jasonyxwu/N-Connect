
var Message=require('../models/message.js');
var Group=require('../models/group.js');
var User=require('../models/user.js');

module.exports = function (router) {

    var messageRoute = router.route('/message/');
    var messageidRoute = router.route('/message/:id');
    //debug 用
    messageRoute.post(function (req, res) {
       console.log("res")
        var date=new Date();
        var time=date.toJSON();
   
        if (req.body.UserId== null || req.body.GroupId==null) {
            return res.status(400).send({ message:  "Empty user or group",
            data: null
            });
        }
        var message = new Message({
            DateCreated: time, 
            Content: req.body.Content,
            Sender: req.body.UserId,
            ToGroup: req.body.GroupId
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
    });
   

    messageidRoute.get(function (req, res) {
        var id=req.params.id;       
        var sel=JSON.parse(req.query.select||"{}")
        Message.findById(id, function (err, temp) {
            if (err) {
                if (err.status==404) {
                    return res.status(404).send({ message:  "no found",data: null});
                }
                else{
                    return res.status(500).send({ message:  "server error",data: null});
                }
            }
            if (temp==null) {
                return res.status(404).send({ message:  "no found",data: temp});
            }
            return res.status(200).send({ message:  "OK",
                data: temp
            });
      }).select(sel);
    });

    messageidRoute.delete(function (req, res) {
        var id=req.params.id;//AndRemove
        Message.findByIdAndRemove(id, function (err, temp) {
            if (err) {
              if (err.status==404) {
                  return res.status(404).send({ message:  "task no found",data: null});
              }
              else{
                  return res.status(500).send({ message:  "server error",data: null});
              }
            }
            if (temp) {
                return res.status(200).send({ message:  "OK",
                    data: temp
                }); 
            }
            return res.status(404).send({ message:  "not found",
                data: temp
            });  
        });
    });

    

    return router;
}
