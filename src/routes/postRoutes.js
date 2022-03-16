const router = require('express').Router();
const addPost = require('../controllers/postController');
const checkSignin = require('../middlewares/checkSignin');

router.post('/post', checkSignin, addPost);

module.exports = router;
