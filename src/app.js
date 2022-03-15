const express = require('express');

const app = express();
const cookieParser = require('cookie-parser');
const router = require('./routes/postRoutes');

app.use(cookieParser());
app.use(express.json());

app.use(router);

module.exports = app;
