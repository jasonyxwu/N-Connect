var mongoose = require('mongoose');

// Define our user schema
var MessageSchema = new mongoose.Schema({
    DateCreated: {type: Date, default: Date.now}, 
    Content: {type: String, required: true},
    Sender: {type: String, required: true},
    ToGroup: {type: String, required: true}
});

// Export the Mongoose model
module.exports = mongoose.model('Message', MessageSchema);