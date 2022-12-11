var mongoose = require('mongoose');

var GroupSchema = new mongoose.Schema({
    DateCreated: {type: Date, default: Date.now}, 
    GroupName: {type: String, required: true},
    GroupMember: {type: [String], required: true},
    GroupIcon: {type: String, default: ""},
});

module.exports = mongoose.model('Group', GroupSchema);