const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const SkillSchema = new Schema({
  name: {
    type: String,
    default: null
  },
  level: {
    type: String,
    default: null
  }
});

const Skill = model('Skill', SkillSchema);

module.exports = Skill;
