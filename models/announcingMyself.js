const mongoose = require("mongoose");

const AnnouncingMeSchema = new mongoose.Schema(
  {
    titleJob: {
      type: String,
      required: true,
    },
    jobDescirption: {
      type: String,
      required: true,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
  date:{
    type: Date,
    default: Date.now
  },
     createdAt: {
    type: Number,
    default: Date.now
}
  },
  { timestamps: true }
);

AnnouncingMeSchema.index({ country: 'text' });
const AnnouncingMe = mongoose.model("AnnouncingMe", AnnouncingMeSchema);
module.exports = AnnouncingMe;