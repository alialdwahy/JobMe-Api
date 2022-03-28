
const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    titleJob: {
      type: String,
      required: true,
    },
    jobDescirption: {
      type: String,
      required: true,
      },
    requirements: {
      type: String,
      required: true,
    },
    gendar:{
      type:String,
    },
    workTime:{
      type: String,
    },
    userid:{
      type: mongoose.Schema.Types.ObjectId,ref: 'CompanyProfaile',
      required:true
    },
  date:{
    type: Date,
    default: Date.now
  },
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: '10d' },
  },
  },
  { timestamps: true }
);

JobSchema.index({ country: 'text' });
const Job = mongoose.model("Job", JobSchema);
module.exports = Job;
