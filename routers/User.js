const User =  require('../controllers/User_Controller');

const  express = require('express');
const router = express.Router()

router.route('/:Userdata')
	.get([ User.get])
	.put([ User.update])
	.delete([ User.delete]);
	
	module.exports = router;