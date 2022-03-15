const express = require('express');
const authRouter = require('./routes/authRoutes');
const app = express();
const cookieParser = require('cookie-parser');
const errorHandler = require('./middlewares/error-handler');
app.use(cookieParser());
app.use(express.json());

app.use(express.static('public'));

app.use('/api/auth', authRouter);

app.use(errorHandler);
module.exports = app;
