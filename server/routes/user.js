var User = require("../models/user.js");

module.exports = function(router) {
    router.route("/user").post(function(req, res) {
        console.log('YEs');
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

    return router;
}