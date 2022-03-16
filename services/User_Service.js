
const errorMessages = require('../config/error.messages');

const User  = require('../models/User');


async function update(UserId) {
    return await User.findById(UserId).populate('user')
}
 async function deletet(UserId) {
    return await User.findByIdAndRemove(UserId);
}

async function CheakUser(Username) {
    const user = await User.find(Username);
    if(! user.Username){
        throw new Error(errorMessages.USER_NOT_FOUND);
    }
    console.log(Username);
    return await User.find(Username).populate('user');
} 
async function FindUSer(Username,Password) {
    const user = await User.find(Username,Password);
    if(! user.Username){
        throw new Error(errorMessages.USER_NOT_FOUND);
    }
    if(! user.Password){
        throw new Error(errorMessages.Password);
    }
    return await User.find(user).populate('user');
}
async function create(NewUser) {

    const Users = user.Users || [];
    Users.push(id);
    await user.save();
    NewUser.user = User;
    return await NewUser.save();
}

module.exports = {
    update,
    deletet,
    create,
    CheakUser,
    FindUSer,
};