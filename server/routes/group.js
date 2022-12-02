var Group = require("../models/group");

module.exports = function (router) {
    var GroupRoute = router.route('/group');    
    GroupRoute.post(function (req, res) {
        const newGroup = new Group({GroupName:req.body.GroupName, GroupMember:req.body.GroupMember, dateCreated:new Date()});
        newGroup.save();
        
        res.status(201).json({
            message: "group created",
            data: {
                _id: newGroup._id,
            }
        });
    });
    return router;
}
