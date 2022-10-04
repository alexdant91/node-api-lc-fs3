const express = require('express');
const app = express.Router();

const Joi = require('joi');
const path = require('path');
const bcrypt = require('bcryptjs');

const { User } = require('../../db');
const { authUser } = require('../../middleware/auth');
const { clearUserUpdatePayload, isUserProfileComplete, saveProfileImage } = require('../../utility/data');
const { formatErrors } = require('../../utility/errors');

/**
 * Otteniamo i dati ddell'utente loggato in forma estesa o meno
 * Possiamo passare il token anche fra i query paramenters
 * @path /api/me
 * @method GET
 */
app.get('/', authUser({ getPrefFromQuery: true }), (req, res) => res.status(200).json({ ...req.user }));

/**
 * Ottengo l'immagine del profilo dell'utente corrente
 * @path /api/me/profile_image/${user_id}/${file_name}
 * @method GET
 */
app.get('/profile_image/:user_id/:file_name', async (req, res) => {
  const { user_id, file_name } = req.params;

  return res.download(path.join(__dirname, `../../uploads/profile_image/${user_id}/${file_name}`));
});

/**
 * Update dei dati dell'utente corrente
 * @path /api/me
 * @method PUT
 */
app.put('/', authUser(), async (req, res) => {
  const { _id } = req.user;

  const schema = Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    profile_image: Joi.object().keys({
      content: Joi.string().required(),
      file_name: Joi.string().required(),
    }).default(false),
    birth_date: Joi.string().default(false),
    sex: Joi.string().default(false),
    phone_number: Joi.number().default(false),
    city: Joi.string().default(false),
    job_type: Joi.number().default(false),
    role: Joi.string().default(false),
    bio: Joi.string().default(false),
    skills: Joi.array().items(Joi.string()).default(false),
    work_place: Joi.string().default(false),
    work_experiences: Joi.array().items(Joi.string()).default(false),
    languages: Joi.array().items(Joi.string()).default(false),
    is_profile_visible: Joi.boolean().default(true),
  });

  try {
    const data = await schema.validateAsync(req.body);

    clearUserUpdatePayload(data, ['is_profile_visible']);

    if (data.birth_date) data.birth_date = new Date(data.birth_date);

    // Salvare l'immagine del profilo
    // profile_image -> Buffer.from(IMAGE_FILE_BINARY_DATA, 'base64') -> { content: Buffer.from(IMAGE_FILE_BINARY_DATA, 'base64'), file_name: "name.ext" }

    if (data.profile_image) data.profile_image = saveProfileImage(data.profile_image);

    await User.updateOne({ _id }, data);

    const user = await User.findOne({ _id }, '-__v, -password -is_profile_visible -is_profile_complete', { lean: true });

    const is_profile_complete = isUserProfileComplete(user);

    await User.updateOne({ _id }, { is_profile_complete });

    return res.status(200).json({ message: "User data updated", is_profile_complete });

  } catch (err) {
    formatErrors(err, res);
  }
});

/**
 * Modifica della password dell'utente
 * @path /api/me/password
 * @method PUT
 */
app.put('/password', authUser(), async (req, res) => {
  const { _id } = req.user;

  const schema = Joi.object().keys({
    password: Joi.string().required(),
  });

  try {
    const data = await schema.validateAsync(req.body);

    data.password = bcrypt.hashSync(data.password);

    await User.updateOne({ _id }, { password });

    return res.status(200).json({ message: "User password updated" });

  } catch (err) {
    formatErrors(err, res)
  }
});

/**
 * @path /api/me
 * @method DELETE
 */
app.delete('/', authUser(), async (req, res) => {
  const { _id } = req.user;

  try {
    await User.deleteOne({ _id });

    return res.status(200).json({ message: "User deleted" });
  } catch (err) {
    formatErrors(err, res)
  }
});

module.exports = app;
