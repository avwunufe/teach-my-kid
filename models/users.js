const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    PhoneNumber: {
        type: String
    },
    Password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
})
module.exports = User = mongoose.model('User', userSchema)