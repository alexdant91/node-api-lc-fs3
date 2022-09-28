require('dotenv').config({ path: './.env' });

const express = require('express');
const app = express();

const cors = require('cors');
const helmet = require('helmet');

const { SERVER_PORT } = process.env;

app.use(cors());
app.use(helmet());

app.use(express.json({ extended: true, limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

const apiRouter = require('./api');
const authRouter = require('./auth');

app.all('/', (_, res) => res.status(200).json({ status: "Online" }));

/**
 * @path /api
 * @method ALL
 */
app.use('/api', apiRouter);

/**
 * @path /auth
 * @method ALL
 */
app.use('/auth', authRouter);

app.listen(SERVER_PORT, () => {
  console.log(`[SERVER]: Up and running on ${SERVER_PORT} port...`);
});
