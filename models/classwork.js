const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const commentSchema = new Schema({
    Body: {
        type: String,
        required: true
    },
    FullName: {
        type: String,
        required: true
    },
    Creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
})
const classWork = new Schema({
    ClassID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Class"
    },
    Date: {
        type: Date,
        required: true
    },
    Subject: {
        type: String,
        required: true
    },
    Topic: {
        type: String,
    },
    Body: {
        type: String,
        required: true
    },
    Comments: [commentSchema]

})
module.exports = ClassWork = mongoose.model('classWork', classWork)