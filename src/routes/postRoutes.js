const router = require('express').Router();
const addPost = require('../controllers/postController');
const verifyUser = require('../middlewares/verifyUser');
const logoutController = require('../controllers/logoutController');
const loginedUser = require('../controllers/loginedUser');

router.post('/post', verifyUser, addPost);
router.get('/logout',verifyUser, logoutController );
router.get('/login/user',verifyUser, loginedUser)

module.exports = router;
