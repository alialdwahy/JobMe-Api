const Login =  require('../controllers/Login_Controller');

const  express = require('express');
const router = express.Router()

router.route('/:Login')
	 .get([ Login.get])
	
	module.exports = router;