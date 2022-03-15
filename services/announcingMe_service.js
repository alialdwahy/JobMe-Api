const errorMessages = require('../config/error.messages');

const AnnouncingMe  = require('../models/announcingMyself');
const User  = require('../models/User');

 async function list({ limit=50,offset=0, ...args} = {}) {
    return await AnnouncingMe.find({})
}
 async function getAnnouncingMeByUser(userId, { limit=50,offset=0, ...args} = {}) {
    return await AnnouncingMe.find({user : userId}).populate('user')
}
 async function findById(id) {
    console.log(id);
    return await AnnouncingMe.findById(id).populate('user');
}
 async function create(announcingMe, userId) {
     const newAnnouncingMe = await AnnouncingMe.create(announcingMeost);
     const id = AnnouncingMe._id;
     const user = await User.findById(userId);
     if(! user){
         throw new Error(errorMessages.USER_NOT_FOUND);
     }
     const announcingMes = user.announcingMes || [];
     announcingMes.push(id);
     user.announcingMes = announcingMes;
     await user.save();
     newAnnouncingMe.user = userId;
     return await newAnnouncingMe.save();
}
 async function update(UserId) {
    return await AnnouncingMe.findById(UserId).populate('user')
}
 async function deletet(announcingMeId) {
    return await AnnouncingMe.findByIdAndRemove(announcingMeId);
}

module.exports = {
    update,
    deletet,
    create,
    findById,
    getAnnouncingMeByUser,
    list,
  };