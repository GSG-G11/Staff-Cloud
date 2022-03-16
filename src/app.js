const express = require('express');
const { join} = require ('path')
const cookieParser = require('cookie-parser');
const router = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');
const errorHandler = require('./middlewares/error-handler');

const app = express();
app.use(cookieParser());
app.disable('x-powered-by');
app.use(express.urlencoded({ extended: false }));
app.use(express.static(join(__dirname, '..', 'public')));
app.use(express.json());

app.use('/api/auth', authRouter);
app.use(router)
app.use(errorHandler);
module.exports = app;
