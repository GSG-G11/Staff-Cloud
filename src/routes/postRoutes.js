const router = require('express').Router();
const addPost = require('../controllers/postController');
const deletePost = require('../controllers/deletePost');
const verifyUser = require('../middlewares/verifyUser');
const userOwnsPost = require('../middlewares/userOwnsPost');
const loginedUser = require('../controllers/loginedUser');
const logoutController = require('../controllers/logoutController');

router.post('/post', verifyUser, addPost);
router.delete('/post/:id', verifyUser, userOwnsPost , deletePost);
router.get('/logout',verifyUser, logoutController );
router.get('/login/user',verifyUser, loginedUser);

module.exports = router;
