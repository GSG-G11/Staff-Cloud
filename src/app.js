const express = require('express');
const authRouter = require('./routes/authRoutes');
const app = express();
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRouter);
module.exports = app;
