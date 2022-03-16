const errorMessages = require('../config/error.messages');

const Job  = require('../models/jobAdvertisement');
const User  = require('../models/User');

 async function list({ limit=50,offset=0, ...args} = {}) {
    return await Job.find({})
}
 async function getJobByUser(userId, { limit=50,offset=0, ...args} = {}) {
    return await Job.find({user : userId}).populate('user')
}
 async function findById(id) {
    console.log(id);
    return await Job.findById(id).populate('user');
}
 async function create(job, userId) {
     const newJobs = await Job.create(job);
     const id = job._id;
     const user = await User.findById(userId);
     if(! user){
         throw new Error(errorMessages.USER_NOT_FOUND);
     }
     let jobs = user.jobs || [];
     jobs.push(id);
     user.jobs = jobs;
     await user.save();
     newJob.user = userId;
     return await newJob.save();
}
 async function update(UserId) {
    return await Job.findById(UserId).populate('user')
}
 async function deletet(jobId) {
    return await Job.findByIdAndRemove(jobId);
}
module.exports = {
    update,
    deletet,
    create,
    findById,
    getJobByUser,
    list,
  };