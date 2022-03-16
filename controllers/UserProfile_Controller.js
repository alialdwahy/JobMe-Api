const errorMessages = require('../config/error.messages');
const UserProfileService = require('../services/UserProfile_service');
const operations = {
    getUserProfile: async(req, res, next) => {
        const { userId} = req.params;
        try {
            const data = await UserProfileService.getUserProfile(userId, req.query)
            res.status(200).json(data);
        } catch (err) {
            res.status(500).send(errorMessages.SERVER_ERROR);
        }
    },
    get: async(req, res, next) => {
        const announcingMeId = req.params.announcingMeId;
        try {
            const data =  await UserProfileService.findById(announcingMeId);
            res.status(200).json(data);
            } catch(err){
                res.status(500).send(errorMessages.SERVER_ERROR);
        }
    },
    // /api/users/:userid/UserProfileService
    create: async (req, res, next) => {
        try {
        const announcingMe = req.body;
        const { userId } = req.params;
        const data =  await UserProfileService.create(announcingMe, userId)
        res.status(200).json(data);
        } catch(err){
            res.status(500).send(errorMessages.SERVER_ERROR);
        }
    },
    delete: async (req, res) => {
        const { announcingMeId } = req.params;
        try {
            const data = await UserProfileService.delete(announcingMeId);
            res.status(200).json(data);
            } catch(err){
                res.status(500).send(errorMessages.SERVER_ERROR);
        }
    },
    update: async (req, res, next) => {
        const announcingMeId = req.params.announcingMeId;
        const announcingMe = req.body;
        announcingMe.id = announcingMeId;
        try {
            const data =  await UserProfileService.update(announcingMe);
            res.status(200).json(data);

            } catch(err){
                res.status(500).send(errorMessages.SERVER_ERROR);
        }
    }
}
module.exports = operations;

