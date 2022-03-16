const router = require('express').Router();
const addPost = require('../controllers/postController');
const verifyUser = require('../middlewares/verifyUser');
const logoutController = require('../controllers/logoutController');

router.post('/post', verifyUser, addPost);
router.get('/logout',verifyUser, logoutController );

module.exports = router;
