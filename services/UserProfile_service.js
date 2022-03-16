const errorMessages = require('../config/error.messages');

const UserProfile  = require('../models/UserProfile');
const User  = require('../models/User');


async function list({ limit=50,offset=0, ...args} = {}) {
    return await UserProfile.find({})
}
async function getUserProfileByUser(userId, { limit=50,offset=0, ...args} = {}) {
    return await UserProfile.find({user : userId}).populate('user')

}
async function findById(id) {
    console.log(id);
    return await UserProfile.findById(id).populate('user');
}
async function create(fserfrofileMe, userId) {
    const newUserProfile = await UserProfile.create(UserProfileost);
    const id = UserProfile._id;
    const user = await User.findById(userId);
    if(! user){
        throw new Error(errorMessages.USER_NOT_FOUND);
    }
    const UserProfiles = user.UserProfiles || [];
    UserProfiles.push(id);
    user.UserProfiles = UserProfiles;
    await user.save();
    newUserProfile.user = userId;
    return await newUserProfile.save();
}
async function update(UserId) {
    return await UserProfile.findById(UserId).populate('user')
}
 async function deletet(userProfileMeId) {
    return await UserProfile.findByIdAndRemove(userProfileMeId);
}
module.exports = {
    update,
    deletet,
    create,
    findById,
    getUserProfileByUser,
    list,
  };