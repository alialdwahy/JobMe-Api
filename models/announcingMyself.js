const mongoose = require("mongoose");

const AnnouncingMeSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      require: true,
    },
    titleJob: {
      type: String,
      required: true,
    },
    jobDescirption: {
      type: String,
      required: true,
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