const express = require('express');
const app = express.Router();

app.get('/', (_, res) => res.status(200).json({ status: "Online" }));

module.exports = app;
