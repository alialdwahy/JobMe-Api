const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        min: 3,
        max: 20,
        unique: true,
      },
    password: {
        type: String,
        required:true,
    },
    role: {
        type: String,
        enum: ["user", "company", "admin"],
        default: "user"
    },

}, 
{timestamps: true}
);
const User = mongoose.model("User", UserSchema);
module.exports = User;

