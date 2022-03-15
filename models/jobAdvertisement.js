
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

JobSchema.index({ country: 'text' });
const Job = mongoose.model("Job", JobSchema);
module.exports = Job;
