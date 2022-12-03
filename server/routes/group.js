var Group = require("../models/group");

module.exports = function (router) {
    var GroupRoute = router.route('/group');    
    GroupRoute.post(function (req, res) {
        const newGroup = new Group({GroupName:req.body.GroupName, GroupMember:req.body.GroupMember, DateCreated:new Date()});
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


// var Group = require("../models/group.js");

// module.exports = function(router) {
//     router.route("/groups").post(function(req, res) {
//         var group = new Group();
//         if(req.body.GroupName == undefined) {
//             return res.status(400).send({
//                 message: "Group Name cannot be empty",
//                 data: []
//             });
//         } else {
//             group.GroupName = req.body.GroupName;
//         }
//         if(req.body.GroupMember == undefined || req.body.GroupMember.length < 2) {
//             return res.status(400).send({
//                 message: "Group Member cannot be less than 2",
//                 data: []
//             });
//         } else {
//             group.GroupMember = req.body.GroupMember;
//         }
//         group.save()
//         .then(function(data) {
//             return res.status(201).send({
//                 message: "Group created",
//                 data: data
//             });
//         })
//         .catch(function(error) {
//             return res.status(500).send({
//                 message: "Server error",
//                 data: error
//             });
//         });
//     });

//     return router;
// }
