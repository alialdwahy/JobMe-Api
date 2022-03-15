
const errorMessages = require('../config/error.messages');
const  jobAdvertisement = require('../services/jobAdvertisement_service');

const operations = {
    getJobByUser: async(req, res, next) => {
        const { userId} = req.params;
        try {
            const data = await jobAdvertisement.getJobByUser(userId, req.query)
            res.status(200).json(data);
        } catch (err) {
            res.status(500).send(errorMessages.SERVER_ERROR);
        }
    },
    get: async(req, res, next) => {
        const jobId = req.params.jobId;
        try {
            const data =  await jobAdvertisement.findById(jobId);
            res.status(200).json(data);
            } catch(err){
                res.status(500).send(errorMessages.SERVER_ERROR);
        }
    },
    // /api/users/:userid/posts
    create: async (req, res, next) => {
        try {
        const job = req.body;
        const { userId } = req.params;
        const data =  await jobAdvertisement.create(job, userId)
        res.status(200).json(data);
        } catch(err){
            res.status(500).send(errorMessages.SERVER_ERROR);
        }
    },
    delete: async (req, res) => {
        const { jobId } = req.params;
        try {
            const data = await jobAdvertisement.delete(jobId);
            res.status(200).json(data);
            } catch(err){
                res.status(500).send(errorMessages.SERVER_ERROR);
        }
    },
    update: async (req, res, next) => {
        const jobId = req.params.jobId;
        const job = req.body;
        job.id = jobId;
        try {
            const data =  await jobAdvertisement.update(job);
            res.status(200).json(data);

            } catch(err){
                res.status(500).send(errorMessages.SERVER_ERROR);
        }
    }
}

module.exports = operations;
