const express = require('express');
const app = express.Router();

/**
 * @path /api/users
 * @method ALL
 */
app.use('/users', require('./routes/users'));

module.exports = app;
