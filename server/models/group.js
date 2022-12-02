var mongoose = require('mongoose');

var GroupSchema = new mongoose.Schema({
    dateCreated: Date, 
    GroupName: String, 
    GroupMember: [String]
});

module.exports = mongoose.model('Group', GroupSchema);