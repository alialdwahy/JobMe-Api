
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
    expireDate:{
      type: Number,
      default: '10'
    },
  
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: 'expireDate d' },
  },
  },
  { timestamps: true }
);

JobSchema.index({ country: 'text' });
const Job = mongoose.model("Job", JobSchema);
module.exports = Job;
