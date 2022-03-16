const announcingMe =  require('../controllers/announcingMe_controller');

const  express = require('express');
const router = express.Router()

router.route('/:announcingMeId')
	.get([ announcingMe.get])
	.put( [announcingMe.update])
	.delete([ announcingMe.delete]);


    module.exports = router;