const announcingMe =  require('../controllers/announcingMe_controller');
const postValidator =  require('../validators/post.validator');
const  express = require('express');
const router = express.Router()

router.route('/:announcingMeId')
	.get([postValidator.uuidValidator, announcingMe.get])
	.put([postValidator.uuidValidator, announcingMe.update])
	.delete([postValidator.uuidValidator, announcingMe.delete]);


    module.exports = router;