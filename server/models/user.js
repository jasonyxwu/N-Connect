var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    dateCreated: Date, 
    SW: String,
    UserName: String,
    Password: String,
    FriendGroups: [String],
    Groups: [String],
    Description: String,
});

module.exports = mongoose.model('User', UserSchema);