const express = require('express');
const { join } = require('path');

const app = express();
const cookieParser = require('cookie-parser');
const postRouter = require('./routes/postRoutes');
const getPostRouter = require('./routes/getPosts');
const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');
const errorHandler = require('./middlewares/error-handler');

app.use(cookieParser());
app.disable('x-powered-by');
app.use(express.urlencoded({ extended: false }));
app.use(express.static(join(__dirname, '..', 'public')));
app.use(express.json());

app.use('/api/auth', authRouter);
app.use(userRouter);
app.use(postRouter);
app.use(getPostRouter);

app.use(errorHandler);

module.exports = app;
