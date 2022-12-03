var User = require("../models/user.js");

module.exports = function(router) {
    router.route("/users").post(function(req, res) {
        var user = new User();
        if(req.body.UserName == undefined) {
            return res.status(400).send({
                message: "User Name cannot be empty",
                data: []
            });
        } else {
            user.UserName = req.body.UserName;
        }

        if(req.body.Password == undefined) {
            return res.status(400).send({
                message: "Password cannot be empty",
                data: []
            });
        } else {
            user.Password = req.body.Password;
        }

        if(req.body.SW == undefined) {
            return res.status(400).send({
                message: "SW number cannot be empty",
                data: []
            });
        }else{
            User.findOne({SW: req.body.SW}).exec()
            .then(function(match) {
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