const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const messageSchema = new Schema({
    traveler: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    propertyId: {
        type: String,
        required: true
    },
    headline: String,
    messages: [{
        to: String,
        from: String,
        message: String
    }]
});

const Message = mongoose.model('conversations', messageSchema);
module.exports = { Message };