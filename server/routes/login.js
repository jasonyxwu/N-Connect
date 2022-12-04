var User = require("../models/user.js");

module.exports = function(router) {
    router.route("/login").post(function(req, res) {
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
    return router;
}