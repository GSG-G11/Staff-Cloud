const router = require('express').Router();
const addUserController = require('../controllers/addUserController');
const signupPage = require('../controllers/signupPage');
const loginPage = require('../controllers/loginPage');

router.get('/login', loginPage)
router.get('/register', signupPage)
router.post('/signup', addUserController)

module.exports = router;
