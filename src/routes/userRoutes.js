const router = require('express').Router();
const registerController = require('../controllers/registerController');
const signupPage = require('../controllers/signupPage');
const loginPage = require('../controllers/loginPage');

router.get('/login', loginPage)
router.get('/register', signupPage)
router.post('/signup', registerController)

module.exports = router;
