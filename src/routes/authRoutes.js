const express = require('express');
const { login } = require('../controllers/authController');

const  checkSignin  = require('../middlewares/checkSignin');

const router = express.Router();

router.post('/login', login);

module.exports = router;
