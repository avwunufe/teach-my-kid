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

const feedSchema = new Schema({
    ClassID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Class"
    },
    Body: {
        type: String,
        required: true
    },
    Comments: [commentSchema],
    Creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }

})
module.exports = Feed = mongoose.model('Feed', feedSchema)