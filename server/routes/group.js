var User = require("../models/user")
var Group = require("../models/group");
var Message = require("../models/message");
const { update, findById } = require("../models/user");
const { token } = require("../config/secrets");
module.exports = function (router) {
    var GroupRoute = router.route('/group');
    var GroupidRoute = router.route('/group/:id');  
    var GroupMessagesRoute = router.route('/group/:id/messages');
    // Oscar start
    // Create group
    // GroupName defined and not ""
    // GroupMember.length >= 2
    // Each userid in GroupMember valid      
    router.route('/group').post(function(req, res) {
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
                        var group = new Group();
                        if(req.body.GroupName == undefined || req.body.GroupName == "") {
                            return res.status(400).send({
                                message: "Group Name cannot be empty",
                                data: []
                            });
                        } else {
                            group.GroupName = req.body.GroupName;
                        }
                        if(req.body.GroupIcon != undefined && req.body.GroupIcon != "") {
                            group.groupIcon = req.body.GroupIcon;
                        }
                        if(req.body.GroupMember == undefined || req.body.GroupMember.length < 2) {
                            return res.status(400).send({
                                message: "Group Member cannot be less than 2",
                                data: []
                            });
                        } else {
                            // Push friendgroup id to all user
                            req.body.GroupMember.forEach(function(userid) {
                                User.findById(userid).exec()
                                .then(function(user) {
                                    user.Groups.push(group.id);
                                    user.save();
                                });
                            });
                            group.GroupMember = req.body.GroupMember;
                            group.save()
                            .then(function(data) {
                                return res.status(201).send({
                                    message: "Group created",
                                    data: data
                                });
                            })
                            .catch(function(error) {
                                return res.status(500).send({
                                    message: "Server error4",
                                    data: error
                                });
                            });
                        }

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
    

    // Create friend group
    // GroupMember.length == 2
    // Each userid in GroupMember valid  
    router.route('/friendgroup').post(function(req, res) {
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
                        var group = new Group();
                        group.GroupName = "private chat "+group.id;
                        if(req.body.GroupMember == undefined || req.body.GroupMember.length != 2) {
                            return res.status(400).send({
                                message: "Friend Group Member can only be 2",
                                data: []
                            });
                        } else {
                            // Push friendgroup id to all user
                            req.body.GroupMember.forEach(function(userid) {
                                User.findById(userid).exec()
                                .then(function(user) {
                                    user.FriendGroups.push(group.id);
                                    user.save();
                                });
                            });
                            group.GroupMember = req.body.GroupMember;
                            group.save()
                            .then(function(data) {
                                return res.status(201).send({
                                    message: "Group created",
                                    data: data
                                });
                            })
                            .catch(function(error) {
                                return res.status(500).send({
                                    message: "Server error4",
                                    data: error
                                });
                            });
                        }
                    }
                })
                .catch(function(error) {
                    return res.status(500).send({
                        message: "Server error1",
                        data: error
                    });
                });
            }
        }
    });
    // group update, should only be used on groups, not any friendgroup
    // if req.body.GroupName left undefined, GroupName will not update;
    // if req.body.GroupIcon left undefined, GroupIcon will not update
    // if req.body.GroupMember left undefined, GroupMember will not update;
    // if req.body.GroupMember can has length more than 1
    router.route('/group/:id').put(function(req, res) {
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
                        Group.findById(req.params.id).exec()
                        .then(function(group) {
                            if (group == null) {
                                return res.status(404).send({
                                    message: "Group not found",
                                    data: []
                                });
                            } else {
                                if (req.body.GroupMember != undefined && req.body.GroupMember.length > 0) {
                                    // Push friendgroup id to all user
                                    req.body.GroupMember.forEach(function(userid) {
                                        User.findById(userid).exec()
                                        .then(function(user) {
                                            // group.GroupMember.push(user.id);
                                            user.Groups.push(group.id);
                                            user.save();
                                        });
                                    });
                                    group.GroupMember.push({$each: req.body.GroupMember});
                                }
                                if (req.body.GroupName != undefined && req.body.GroupName != "") {
                                    group.GroupName = req.body.GroupName;
                                }
                                if (req.body.GroupIcon != undefined && req.body.GroupIcon != "") {
                                    group.GroupIcon = req.body.GroupIcon;
                                }
                                group.save()
                                .then(function(data) {
                                    return res.status(201).send({
                                        message: "Group updated",
                                        data: data
                                    });
                                })
                                .catch(function(error) {
                                    return res.status(500).send({
                                        message: "Server error",
                                        data: error
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

    // //Oscar end
    // GroupRoute.put(function (req, res) {
    //     //  invite friends into groups or change groups' name
    //     //  只修改群名 -> userid留空
    //     //  只邀请成员 -> group name 也需要赋值 
    //     var token = req.body.token;
    //     var groupid = req.body.GroupID;
    //     var userid = req.body.UserID;
    //     var name = req.body.GroupName;    
    //     var member = null;
    //     Group.findById(groupid, function (err, gp) {
    //         if (gp == null){
    //             return res.status(404).json({
    //                 message: "group not found",
    //                 data: []
    //             });
    //         }
    //         if (name == null) {
    //             return res.status(500).json({
    //                 message: "group name should not be null",
    //                 data: []
    //             });
    //         }
    //         member = gp.GroupMember;
           
    //         if ( member.indexOf(userid) != -1) {
    //             // already in the group
    //             return res.status(500).json({
    //                 message: "user already in the group!",
    //                 data: []
    //             });
    //         } 
    //         else {
    //             // insert user into the GroupMember
    //             // Oscar start
    //             User.indexOf(userid).exec()
    //             .then(function(user) {
    //                 if(user == null) {
    //                     return res.status(404).send({
    //                         message: "Invalid group member",
    //                         data: [{"InvalidMember":userid}]
    //                     });
    //                 } else {
    //                     user.Groups.push(gp.id);
    //                     user.save();
    //                 }
    //             })
    //             .catch(function(error) {
    //                 return res.status(500).send({
    //                     message: "Server error",
    //                     data: error
    //                 });
    //             });
    //             // Oscar end
    //             gp.GroupMember.push(userid);
    //             gp.GroupName = name;
    //             gp.save();
    //             return res.status(200).json({
    //                 message: "group name updated!",
    //                 data: []
    //             });
    //         }
    //     });
    // });
        
    // get group on id
    GroupidRoute.post(function (req, res) {
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
                        Group.findById(req.params.id).exec()
                        .then(function(gp) {
                            if(gp == null) {
                                return res.status(404).send({
                                    message: "No Group found",
                                    data: []
                                });
                            } else {
                                return res.status(200).send({
                                    message: "Group found",
                                    data: gp
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

    // get group messages
    GroupMessagesRoute.post(function (req, res) {
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
                        // get all messages in specific group 
                        Group.findById(req.params.id).exec()
                        .then(function(gp) {
                            if(gp == null) {
                                return res.status(404).send({
                                    message: "Group not exists!",
                                    data: []
                                });
                            } else {
                                Message.find({ ToGroup: gp.groupid }, function (err, docs) {
                                    if (err){
                                        console.log(err);
                                    }
                                    else{
                                        return res.status(200).send({
                                            message: "fetch messages succeed",
                                            data: docs
                                        });
                                    }
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
    router.route('/group/world').post(function (req, res) {
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
                        // get all messages in specific group 
                        Message.find({ ToGroup: "world" }, function (err, docs) {
                            if (err){
                                console.log(err);
                            }
                            else{
                                return res.status(200).send({
                                    message: "fetch world messages succeed",
                                    data: docs
                                });
                            }
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

    // leave group
    router.route('/group/:id/exit').post(function (req, res) {
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

                        Group.findById(req.params.id).exec()
                        .then(function(group) {
                            user.Groups.pull(group.id);
                            user.save();
                            group.GroupMember.pull(user.id);
                            group.save();
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


        // // req.body.token = {
        //     // id: String,
        //     // Email: String 
        // // }
        // // Token verification start
        // if (req.body.token == undefined) {
        //     return res.status(404).send({
        //         message: "No valid token",
        //         data: []
        //     });
        // } else {
        //     if (req.body.token.id == undefined) {
        //         return res.status(404).send({
        //             message: "No valid token id",
        //             data: []
        //         });
        //     } else if (req.body.token.Email == undefined) {
        //         return res.status(404).send({
        //             message: "No valid token Email",
        //             data: []
        //         });
        //     } else {
        //         User.findById(req.body.token.id).exec()
        //         .then(function(user) {
        //             if(user == null) {
        //                 return res.status(404).send({
        //                     message: "Invalid token id",
        //                     data: [{"InvalidTokenID":req.body.token.id}]
        //                 });
        //             } else if(req.body.token.Email != user.Email) {
        //                 return res.status(404).send({
        //                     message: "Token Email does not match id",
        //                     data: [{"InvalidTokenEmail":req.body.token.Email}]
        //                 });
        //             } else {
        //                 // Token verification end

        //                 // Main Function
                        
        //             }
        //         })
        //         .catch(function(error) {
        //             return res.status(500).send({
        //                 message: "Server error",
        //                 data: error
        //             });
        //         });
        //     }
        // }
