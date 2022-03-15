const express = require('express');
const { join} = require ('path')
const cookieParser = require('cookie-parser');
const router = require('./routes/userRoutes');

const app = express();
app.use(cookieParser());
app.disable('x-powered-by');
app.use(express.urlencoded({ extended: false }));
app.use(express.static(join(__dirname, '..', 'public'), { maxAge: '30d' }));
app.use(express.json());
app.use(router)
module.exports = app;
