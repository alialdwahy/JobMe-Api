const jobAdvertisement = require('../controllers/jobAdvertisement_controller');
const postValidator = require('../validators/post.validator');
const  express = require('express');
const router = express.Router()

router.route('/:jobId')
	.get([postValidator.uuidValidator, jobAdvertisement.get])
	.put([postValidator.uuidValidator, jobAdvertisement.update])
	.delete([postValidator.uuidValidator, jobAdvertisement.delete]);


    module.exports = router;