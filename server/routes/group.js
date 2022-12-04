var Group = require("../models/group");

module.exports = function (router) {
    var GroupRoute = router.route('/group');
    var GroupidRoute = router.route('/group/:id');      
    GroupRoute.post(function (req, res) {
        //create group 
        var group = new Group();
        if(req.body.GroupName == undefined) {
            return res.status(400).send({
                message: "Group Name cannot be empty",
                data: []
            });
        } else {
            group.GroupName = req.body.GroupName;
        }
        if(req.body.GroupMember == undefined || req.body.GroupMember.length < 2) {
            return res.status(400).send({
                message: "Group Member cannot be less than 2",
                data: []
            });
        } else {
            group.GroupMember = req.body.GroupMember;
        }
        group.save()
        .then(function(data) {
            return res.status(201).send({
                message: "Group created",
                data: data
            });
        })
        .catch(function(error) {
            return res.status(500).send({
                message: "Server error",
                data: error
            });
        });
    });

    GroupRoute.put(function (req, res) {
        //  invite friends into groups or change groups' name
        //  只修改群名 -> userid留空
        //  只邀请成员 -> group name 也需要赋值 
        var token = req.body.token;
        var groupid = req.body.GroupID;
        var userid = req.body.UserID;
        var name = req.body.GroupName;    
        var member = null;
        Group.findById(groupid, function (err, gp) {
            if (gp == null){
                return res.status(404).json({
                    message: "group not found",
                    data: []
                });
            }
            if (name == null) {
                return res.status(500).json({
                    message: "group name should not be null",
                    data: []
                });
            }
            member = gp.GroupMember;
            if ( member.findIndex(userid) != -1) {
                // already in the group
                return res.status(500).json({
                    message: "user already in the group!",
                    data: []
                });
            } 
            else {
                // insert user into the GroupMember
                gp.GroupMember.push(userid);
                gp.GroupName = name;
                gp.save();
                return res.status(200).json({
                    message: "group name updated!",
                    data: []
                });
            }
        });
    });
        
    GroupidRoute.get(function (req, res) {
        // get groups info
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
    });
    return router;
}

