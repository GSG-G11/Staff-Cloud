const router = require('express').Router();
const registerController = require('../controllers/registerController');
const signupPage = require('../controllers/signupPage');
const loginPage = require('../controllers/loginPage');
const getUserInfo = require('../controllers/getUserInfo');

router.get('/login', loginPage);
router.get('/register', signupPage);
router.post('/signup', registerController);
router.get('/users/posts/:id', getUserInfo);

module.exports = router;
