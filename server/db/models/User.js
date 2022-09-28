const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const mongoosePaginate = require('mongoose-paginate-v2');

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: false,
    unique: true,
    default: null,
  },
  password: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
    default: null,
  },
  last_name: {
    type: String,
    required: true,
    default: null,
  },
  is_profile_visible: {
    type: Boolean,
    default: true,
  },
}, { strict: true, timestamps: true }); // -> createdAt: new Date(), updatedAt: new Date(),

UserSchema.plugin(mongoosePaginate);

const User = model('User', UserSchema);

module.exports = User;
