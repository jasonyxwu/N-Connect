var mongoose = require('mongoose');

// Define our user schema
var MessageSchema = new mongoose.Schema({
    dateCreated: Date, 
    Content: String,
    Sender: String,
    ToGroup: String
});

// Export the Mongoose model
module.exports = mongoose.model('Message', MessageSchema);