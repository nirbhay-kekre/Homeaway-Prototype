const mongoose = require('mongoose'),
        Schema = mongoose.Schema;

const credentialsSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    password: String,
    role: String,
    firstname: String,
    lastname: String,
});

const User = mongoose.model('credentials', credentialsSchema);
module.exports = {User};