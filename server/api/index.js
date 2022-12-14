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

/**
 * @path /api/skills
 * @method ALL
 */
app.use('/skills', require('./routes/skills'));

module.exports = app;
