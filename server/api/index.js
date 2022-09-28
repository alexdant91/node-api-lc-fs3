const express = require('express');
const app = express.Router();

/**
 * @path /api/users
 * @method ALL
 */
app.use('/users', require('./routes/users'));

/**
 * @path /api/me
 * @method ALL
 */
app.use('/me', require('./routes/me'));

module.exports = app;
