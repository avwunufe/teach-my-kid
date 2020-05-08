const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const JoinedSchema = new Schema({
    UserID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
}
})
const classSchema = new Schema({
    ClassName: {
        type: String,
        required: true
    },
    Session: {
        type: String,
        required: true
    },
    Arm: {
        type: String,
    },
    Creator: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    JoinedUsers: [JoinedSchema],
    Code: {
        type: String,
        required: true
    }
})
module.exports = Class = mongoose.model('Class', classSchema)