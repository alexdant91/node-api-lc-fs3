const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const LanguageSchema = new Schema({
  language: {
    type: String,
    default: null
  },
  level: {
    type: String,
    default: null
  }
});

const Language = model('Language', LanguageSchema);

module.exports = Language;
