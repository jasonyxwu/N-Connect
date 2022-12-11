
var Message=require('../models/message.js');
var Group=require('../models/group.js');
var User=require('../models/user.js');

module.exports = function (router) {

    var messageRoute = router.route('/message/');
    var messageidRoute = router.route('/message/:id');
    //debug 用
    messageRoute.post(function (req, res) {
        // req.body.token = {
            // id: String,
            // Email: String 
        // }
        // Token verification start
        if (req.body.token == undefined) {
            return res.status(404).send({
                message: "No valid token",
                data: []
            });
        } else {
            if (req.body.token.id == undefined) {
                return res.status(404).send({
                    message: "No valid token id",
                    data: []
                });
            } else if (req.body.token.Email == undefined) {
                return res.status(404).send({
                    message: "No valid token Email",
                    data: []
                });
            } else {
                User.findById(req.body.token.id).exec()
                .then(function(user) {
                    if(user == null) {
                        return res.status(404).send({
                            message: "Invalid token id",
                            data: [{"InvalidTokenID":req.body.token.id}]
                        });
                    } else if(req.body.token.Email != user.Email) {
                        return res.status(404).send({
                            message: "Token Email does not match id",
                            data: [{"InvalidTokenEmail":req.body.token.Email}]
                        });
                    } else {
                        // Token verification end
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
                        
                    }
                })
                .catch(function(error) {
                    return res.status(500).send({
                        message: "Server error",
                        data: error
                    });
                });
            }
        }
        
    });
   

    messageidRoute.get(function (req, res) {
        // req.body.token = {
            // id: String,
            // Email: String 
        // }
        // Token verification start
        if (req.body.token == undefined) {
            return res.status(404).send({
                message: "No valid token",
                data: []
            });
        } else {
            if (req.body.token.id == undefined) {
                return res.status(404).send({
                    message: "No valid token id",
                    data: []
                });
            } else if (req.body.token.Email == undefined) {
                return res.status(404).send({
                    message: "No valid token Email",
                    data: []
                });
            } else {
                User.findById(req.body.token.id).exec()
                .then(function(user) {
                    if(user == null) {
                        return res.status(404).send({
                            message: "Invalid token id",
                            data: [{"InvalidTokenID":req.body.token.id}]
                        });
                    } else if(req.body.token.Email != user.Email) {
                        return res.status(404).send({
                            message: "Token Email does not match id",
                            data: [{"InvalidTokenEmail":req.body.token.Email}]
                        });
                    } else {
                        // Token verification end

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
                        
                    }
                })
                .catch(function(error) {
                    return res.status(500).send({
                        message: "Server error",
                        data: error
                    });
                });
            }
        }
        
    });

    messageidRoute.delete(function (req, res) {
        // req.body.token = {
            // id: String,
            // Email: String 
        // }
        // Token verification start
        if (req.body.token == undefined) {
            return res.status(404).send({
                message: "No valid token",
                data: []
            });
        } else {
            if (req.body.token.id == undefined) {
                return res.status(404).send({
                    message: "No valid token id",
                    data: []
                });
            } else if (req.body.token.Email == undefined) {
                return res.status(404).send({
                    message: "No valid token Email",
                    data: []
                });
            } else {
                User.findById(req.body.token.id).exec()
                .then(function(user) {
                    if(user == null) {
                        return res.status(404).send({
                            message: "Invalid token id",
                            data: [{"InvalidTokenID":req.body.token.id}]
                        });
                    } else if(req.body.token.Email != user.Email) {
                        return res.status(404).send({
                            message: "Token Email does not match id",
                            data: [{"InvalidTokenEmail":req.body.token.Email}]
                        });
                    } else {
                        // Token verification end

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
                        
                    }
                })
                .catch(function(error) {
                    return res.status(500).send({
                        message: "Server error",
                        data: error
                    });
                });
            }
        }
        
    });

    

    return router;
}