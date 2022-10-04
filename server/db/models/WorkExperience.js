const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const WorkExperienceSchema = new Schema({
  society_name: {
    type: String,
    default: null
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: "Role",
    default: null
  },
  start_date: {
    type: Date,
    default: null
  },
  end_date: {
    type: Date,
    default: null
  }
});

const WorkExperience = model('WorkExperience', WorkExperienceSchema);

module.exports = WorkExperience;
