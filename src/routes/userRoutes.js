const router = require('express').Router();
const addUserController = require('../controllers/addUserController');
const signupPage = require('../controllers/signupPage');

router.get('/register', signupPage)
router.post('/signup', addUserController)

module.exports = router;
