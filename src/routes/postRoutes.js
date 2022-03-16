const router = require('express').Router();
const addPost = require('../controllers/postController');
const verifyUser = require('../middlewares/verifyUser');

router.post('/post', verifyUser, addPost);

module.exports = router;
