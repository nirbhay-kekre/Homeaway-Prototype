const mongoose = require('mongoose'),
        Schema = mongoose.Schema;

const profileSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    role: String,
    firstname: String,
    lastname: String,
    aboutme: {type: String, default:""},
    city: {type: String, default:""},
    company: {type: String, default:""},
    school: {type: String, default:""},
    hometown: {type: String, default:""},
    languages: {type: String, default:""},
    profilefilepath: {type: String, default:""},
    createdOn: {type: String, default:(new Date()).toISOString()},
    gender: {type: String, default:""},
    phone: {type: String, default:""},
});

const Profile = mongoose.model('profiles', profileSchema);
module.exports = {Profile};