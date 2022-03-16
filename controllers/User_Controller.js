const errorMessages = require('../config/error.messages');
const User = require('../services/User_Service');

const operations = {
    CheakUser:async(req, res, next) => {
        try {
        }
        catch(err){

        }
    },
    FindUSer:async(req, res, next) => {
        try {
        }
        catch(err){

        }
    },
    create:async(req, res, next) => {
        try {
            const Userdata = req.body;
            const data =  await User.create(Userdata, userId)
            res.status(200).json(data);
        }
        catch(err){
            res.status(500).send(errorMessages.SERVER_ERROR);
        }
    },
    deletet:async(req, res, next) => {
        const { UserId } = req.params;
        try {
            const data = await User.delete(UserId);
            res.status(200).json(data);
            } catch(err){
                res.status(500).send(errorMessages.SERVER_ERROR);
        }
    },
     update:async(req, res, next) => {
        try {
        }
        catch(err){
         
        }
    }
}
module.exports = operations;