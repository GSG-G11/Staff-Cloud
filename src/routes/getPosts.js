const router = require('express').Router();
const getPost = require('../controllers/getPostsController');

router.get('/posts', getPost);

module.exports = router;
