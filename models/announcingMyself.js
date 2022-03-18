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
   createdBy: {
  type: mongoose.Types.ObjectId,
  ref: 'User',
  required: [true, 'Please provide user'],
},
  },
  { timestamps: true }
);

AnnouncingMeSchema.index({ country: 'text' });
const AnnouncingMe = mongoose.model("AnnouncingMe", AnnouncingMeSchema);
module.exports = AnnouncingMe;