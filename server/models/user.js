var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    DateCreated: {type: Date, default: Date.now},
    Email: {type: String, required: true, unique: true},
    UserName: {type: String, default: "Anonymous"},
    Password: {type: String, required: true},
    FriendGroups: {type: [String], default: []},
    Groups: {type: [String], default: []},
    Description: {type: String, default: ""},
});

module.exports = mongoose.model('User', UserSchema);