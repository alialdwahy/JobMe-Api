const mongoose = require("mongoose")


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
    },
    role: {
        type: String,
        enum: ["user", "company", "admin"],
        default: "user"
    },
    password: {
        type: String,
       
    },

    announcingMe: [ { type: mongoose.Schema.Types.ObjectId, ref: 'AnnouncingMe' } ],
    job: [ { type: mongoose.Schema.Types.ObjectId, ref: 'Job' } ]

}, {
    timestamps: true
})

module.exports = mongoose.model("User", UserSchema)

