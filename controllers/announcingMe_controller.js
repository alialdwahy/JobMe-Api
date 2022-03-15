
const errorMessages = require('../config/error.messages');
const announcingMeIdService = require('../services/announcingMe_service');

const operations = {
    getAnnouncingMeByUser: async(req, res, next) => {
        const { userId} = req.params;
        try {
            const data = await announcingMeIdService.getAnnouncingMeByUser(userId, req.query)
            res.status(200).json(data);
        } catch (err) {
            res.status(500).send(errorMessages.SERVER_ERROR);
        }
    },
    get: async(req, res, next) => {
        const announcingMeId = req.params.announcingMeId;
        try {
            const data =  await announcingMeIdService.findById(announcingMeId);
            res.status(200).json(data);
            } catch(err){
                res.status(500).send(errorMessages.SERVER_ERROR);
        }
    },
    // /api/users/:userid/announcingMeIdService
    create: async (req, res, next) => {
        try {
        const announcingMe = req.body;
        const { userId } = req.params;
        const data =  await announcingMeIdService.create(announcingMe, userId)
        res.status(200).json(data);
        } catch(err){
            res.status(500).send(errorMessages.SERVER_ERROR);
        }
    },
    delete: async (req, res) => {
        const { announcingMeId } = req.params;
        try {
            const data = await announcingMeIdService.delete(announcingMeId);
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
            const data =  await announcingMeIdService.update(announcingMe);
            res.status(200).json(data);

            } catch(err){
                res.status(500).send(errorMessages.SERVER_ERROR);
        }
    }
}
module.exports = operations;

