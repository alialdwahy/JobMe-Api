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
      date: {
       type:Date,
       default:Date.now,
      },
  expireDate:{
    type: String,
    default: '60'
  },
  userid:{
    type: mongoose.Schema.Types.ObjectId,ref: 'UserProfaile',
    required:true
  },
  DisplayType:{
    type:Number,
    default:"0"
  },
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: "expireDate" },
  },
  },
  { timestamps: true }
);


AnnouncingMeSchema.index({ country: 'text' });
const AnnouncingMe = mongoose.model("AnnouncingMe", AnnouncingMeSchema);
module.exports = AnnouncingMe;