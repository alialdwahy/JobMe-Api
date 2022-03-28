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
  date:{
    type: Date,
    default: Date.now
  },
  userid:{
    type: mongoose.Schema.Types.ObjectId,ref: 'UserProfaile',
    required:true
  },
  },
  { timestamps: true }
);

AnnouncingMeSchema.index({ country: 'text' });
const AnnouncingMe = mongoose.model("AnnouncingMe", AnnouncingMeSchema);
module.exports = AnnouncingMe;