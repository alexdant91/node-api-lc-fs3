const express = require('express');
const app = express.Router();

const Joi = require('joi');
const bcrypt = require('bcryptjs');
const { formatErrors } = require('../../utility/errors');
const { User } = require('../../db');
const { getUserFilters } = require('../../utility/user');

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

/**
 * Ottengo l'elengo impaginato degli utenti
 * tenendo conto di `is_profile_visible` e `is_profile_complete`.
 * Se i filtri corrispondono ad un array vanno passati i valori
 * separati da `;` altrimenti come string normali
 * @path /api/users?page=1&limit=20?skills=1233451231241234;1233451231241234
 * @method GET
 */
app.get('/', async (req, res) => {
  delete req.query.is_profile_visible;
  delete req.query.is_profile_complete;

  const page = req.query.page || 1;
  const limit = req.query.limit || 20;

  const filters = getUserFilters(req.query);

  try {
    const results = await User.paginate({
      is_profile_visible: true,
      is_profile_complete: true,
      ...filters,
    }, {
      page,
      limit,
      select: '-__v -password -is_profile_visible -is_profile_complete -username -createdAt -updatedAt',
      populate: ["role", "skills", "work_experiences", "languages"],
    });

    const users = { users: results.docs, ...results };

    delete users.docs;

    return res.status(200).json({ ...users }); // -> { users: USERS, currentPage: 1, totalPages: 5, isPrevPage: false, isNextPage: true, totalDocs: 100 } -> 5, 1, prevPage: disabled, nextPage: active

  } catch (err) {
    formatErrors(err, res);
  }
});

module.exports = app;
