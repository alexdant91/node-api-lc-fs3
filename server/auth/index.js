const express = require('express');
const app = express.Router();

const Joi = require('joi');
const bcript = require('bcryptjs');
const { User } = require('../db');
const { formatErrors } = require('../utility/errors');
const { genToken } = require('../utility/auth');

/**
 * Restituire il token di accesso per l'utente
 * @path /auth/token
 * @method POST
 */
app.post('/token', async (req, res) => {
  if (!req.body.email && !req.body.username) return res.status(404).json({ message: "User not found" });

  const schema = Joi.object().keys({
    email: Joi.string().default(false),
    username: Joi.string().default(false),
    password: Joi.string().required(),
  });

  try {
    const data = await schema.validateAsync(req.body);

    const user = await User.findOne({ $or: [{ email: data.email }, { username: data.username }] }, '-__v', { lean: true });

    if (user == null) return res.status(404).json({ message: "User not found" });

    const is_verified_pssword = bcript.compareSync(data.password, user.password);

    if (!is_verified_pssword) return res.status(404).json({ message: "User not found" });

    const token = genToken({ _id: user._id, email: user.email });

    return res.status(200).json({ token });

  } catch (err) {
    formatErrors(err, res);
  }
});

module.exports = app;
