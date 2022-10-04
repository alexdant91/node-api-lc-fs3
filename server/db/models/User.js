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
  },
  last_name: {
    type: String,
    required: true,
  },
  profile_image: {
    type: String,
    default: null,
  },
  birth_date: {
    type: Date || null,
    default: null,
  },
  sex: {
    type: String,
    enum: ['male', 'female', 'na', null],
    default: null,
  },
  phone_number: {
    type: Number,
    default: null
  },
  city: {
    type: String,
    default: null
  },
  job_type: {
    type: Number,
    enum: [0, 1, 2], // -> 0 = FULL_REMOTE; 1 = REMOTE; 2 = OFFICE
    default: null
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: "Role",
    default: null
  },
  bio: {
    type: String,
    default: null
  },
  skills: {
    type: [Schema.Types.ObjectId],
    ref: "Skill",
    default: [],
  },
  work_place: {
    type: [],
    default: []
  },
  work_experiences: {
    type: [Schema.Types.ObjectId],
    ref: "WorkExperience",
    default: [],
  },
  languages: {
    type: [Schema.Types.ObjectId],
    ref: "Language",
    default: [],
  },
  is_profile_visible: {
    type: Boolean,
    default: true,
  },
  is_profile_complete: {
    type: Boolean,
    default: false,
  },
}, { strict: true, timestamps: true }); // -> createdAt: new Date(), updatedAt: new Date(),

UserSchema.plugin(mongoosePaginate);

const User = model('User', UserSchema);

module.exports = User;
