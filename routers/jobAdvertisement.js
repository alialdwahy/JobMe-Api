const jobAdvertisement = require('../controllers/jobAdvertisement_controller');
const  express = require('express');
const router = express.Router()

router.route('/:jobId')
	.get([ jobAdvertisement.get])
	.put([ jobAdvertisement.update])
	.delete([ jobAdvertisement.delete]);


    module.exports = router;