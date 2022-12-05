var User = require("../models/user.js");

module.exports = function(router) {
    // Create new user
    router.route("/user").post(function(req, res) {
     
        var user = new User();
        // Check username validity
        if(req.body.UserName == undefined || req.body.UserName == "") {
            return res.status(400).send({
                message: "User Name cannot be empty",
                data: []
            });
        } else {
            user.UserName = req.body.UserName;
        }
        // Check password validity
        if(req.body.Password == undefined || req.body.Password == "") {
            return res.status(400).send({
                message: "Password cannot be empty",
                data: []
            });
        } else {
            user.Password = req.body.Password;
        }
        // Check SW number validity
        if(req.body.SW == undefined || req.body.SW == "") {
            return res.status(400).send({
                message: "SW number cannot be empty",
                data: []
            });
        }else{
            User.findOne({SW: req.body.SW}).exec()
            .then(function(match) {
                // Check SW number not registered
                if(match != null) {
                    return res.status(400).send({
                        message: "SW number already registered",
                        data: []
                    });
                }else{
                    user.SW = req.body.SW;
                    user.save()
                    .then(function(data) {
                        return res.status(201).send({
                            message: "User created",
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
            });
        }
    });


    // User login
    router.route("/user/login").post(function(req, res) {
        // Find the user of SW number
        User.findOne({SW: req.body.SW}).exec()
        .then(function(match) {
            // No user found, that means this SW number is not registered yet
            if (match == null) {
                return res.status(404).send({
                    message: "SW number not registered",
                    data: []
                });
            }
            // Password Incorrect
            if (match.Password != req.body.Password) {
                return res.status(400).send({
                    message: "Password incorrect",
                    data: []
                });
            } 
            // Login successful, return user data
            return res.status(201).send({
                message: "User login successful",
                data: match
            });
        })
        .catch(function(error) {
            return res.status(500).send({
                message: "Server error",
                data: error
            });
        });
    });


    // User on id
    router.route("/user/:id").get(function(req, res) {       
        User.findById(req.params.id).exec()
        .then(function(user) {
            if(user == null) {
                return res.status(404).send({
                    message: "No user found",
                    data: []
                });
            } else {
                return res.status(200).send({
                    message: "User found",
                    data: user
                });
            }
        })
        .catch(function(error) {
            return res.status(500).send({
                message: "Server error",
                data: error
            });
        });
    });

    router.route("/user/:id").put(function(req, res) {
        User.findById(req.params.id).exec()
        .then(function(user) {
            if(user == null) {
                return res.status(404).send({
                    message: "No user found",
                    data: []
                });
            } else {
                var update = {};
                // Check username validity
                if(req.body.UserName == undefined || req.body.UserName == "") {
                    return res.status(400).send({
                        message: "User Name cannot be empty",
                        data: []
                    });
                } else {
                    update.UserName = req.body.UserName;
                }
                // Check password validity
                if(req.body.Password == undefined || req.body.Password == "") {
                    return res.status(400).send({
                        message: "Password cannot be empty",
                        data: []
                    });
                } else {
                    update.Password = req.body.Password;
                }
                // Check SW number validity
                if(req.body.SW == undefined || req.body.SW == "") {
                    return res.status(400).send({
                        message: "SW number cannot be empty",
                        data: []
                    });
                }else{
                    User.findOne({SW: req.body.SW}).exec()
                    .then(function(match) {
                        // Check SW number not registered by other users
                        if(match != null && match.id != user.id) {
                            return res.status(400).send({
                                message: "SW number already registered",
                                data: []
                            });
                        }else{
                            update.SW = req.body.SW;
                            update.Description = req.body.Description;
                            update.FriendGroups = req.body.FriendGroups;
                            update.Groups = req.body.Groups;
                            User.findByIdAndUpdate(user.id, update, {new: true})
                            // .then(function(updated) {

                            // })
                            .catch(function(error) {
                                return res.status(500).send({
                                    message: "Server error",
                                    data: error
                                });
                            });
                        }
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
    });

    // router.route("/user/:id").delete(function(req, res) {
    //     User.findById(req.params.id).exec()
    //     .then(function(user) {
    //         if(user == null) {
    //             return res.status(404).send({
    //                 message: "No user found",
    //                 data: []
    //             });
    //         } else {
    //             Task.updateMany({assignedUser: user.id}, {assignedUser: "", assignedUserName: "unassigned"})
    //             .then(function() {
    //                 user.delete().then(function() {
    //                     return res.status(200).send({
    //                         message: "User deleted",
    //                         data: []
    //                     });
    //                 });
    //             });
    //         }
    //     })
    //     .catch(function(error) {
    //         return res.status(500).send({
    //             message: "Server error",
    //             data: error
    //         });
    //     });
    // });


    return router;
}