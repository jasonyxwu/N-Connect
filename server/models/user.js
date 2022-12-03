var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    dateCreated: {type: Date, default: Date.now},
    sw: {type: String, required: true},
    userName: {type: String, required: true},
    password: {type: String, required: true},
    friendGroups: {type: [String], default: []},
    groups: {type: [String], default: []},
    description: {type: String, default: ""},
});

module.exports = mongoose.model('User', UserSchema);