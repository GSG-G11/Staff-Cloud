const router = require('express').Router();
const addPost = require('../controllers/postController');
const deletePost = require('../controllers/deletePost');
const verifyUser = require('../middlewares/verifyUser');
const userOwnsPost = require('../middlewares/userOwnsPost');

router.post('/post', verifyUser, addPost);
router.delete('/post/:id', verifyUser, userOwnsPost , deletePost);

module.exports = router;
