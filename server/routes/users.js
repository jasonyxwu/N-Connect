var User = require("../models/user.js");

module.exports = function(router) {
    router.route("/users").post(function(req, res) {
        var user = new User();
        if(req.body.userName == undefined) {
            return res.status(400).send({
                message: "User Name cannot be empty",
                data: []
            });
        } else {
            user.userName = req.body.userName;
        }

        if(req.body.password == undefined) {
            return res.status(400).send({
                message: "Password cannot be empty",
                data: []
            });
        } else {
            user.password = req.body.password;
        }

        if(req.body.sw == undefined) {
            return res.status(400).send({
                message: "SW number cannot be empty",
                data: []
            });
        }else{
            User.findOne({sw: req.body.sw}).exec()
            .then(function(match) {
                if(match != null) {
                    return res.status(400).send({
                        message: "SW number already registered",
                        data: []
                    });
                }else{
                    user.sw = req.body.sw;
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