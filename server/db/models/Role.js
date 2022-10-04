const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const RoleSchema = new Schema({
  name: {
    type: String,
    default: null
  },
  level: {
    type: String,
    default: null
  }
});

const Role = model('Role', RoleSchema);

module.exports = Role;
