const express = require('express');
const app = express.Router();

const Joi = require('joi');
const bcrypt = require('bcryptjs');
const { formatErrors } = require('../../utility/errors');
const { User } = require('../../db');

/**
 * Route per la registrazione di un nuovo utente
 * @path /api/users
 * @method POST
 */
app.post('/', async (req, res) => {
  const schema = Joi.object().keys({
    email: Joi.string().required(),
    username: Joi.string().default(null),
    password: Joi.string().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
  });

  try {
    const data = await schema.validateAsync(req.body);

    data.password = bcrypt.hashSync(data.password, 12);

    await new User({ ...data }).save();

    return res.status(201).json({ message: "User created" });

  } catch (err) {
    formatErrors(err, res);
  }
});

module.exports = app;
