const express = require('express');
const app = express.Router();

const { Skill } = require('../../db');
const { formatErrors } = require('../../utility/errors');

/**
 * Ottengo tutte le skills dal DB
 * @path /api/skills
 * @method GET
 */
app.get('/', async (req, res) => {
  try {
    const skills = await Skill.find({}, '-__v', { lean: true });

    return res.status(200).json({ skills });
  } catch (err) {
    formatErrors(err, res);
  }
})

module.exports = app;
