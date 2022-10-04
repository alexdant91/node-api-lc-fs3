const { default: mongoose } = require('mongoose');
const { USER_FILTERS_SCHEMA } = require('../api/constants/user');
const { User } = require('../db');
const { formatErrors } = require('./errors');

/**
 * Otteniamo i dati dell'utente in forma estesa o meno
 * @param {ExpressResponse} res
 * @param {boolean} extended
 * @returns
 */
const getUserData = async (res, _id, extended = false) => {
  try {
    return extended ?
      await User.findOne({ _id }, '-__v -password', { lean: true }).populate("role").populate("skills").populate("work_experiences").populate("languages")
      :
      await User.findOne({ _id }, '-__v -password -is_profile_visible -username -createdAt -updatedAt -role -skills -work_experiences -languages', { lean: true });
  } catch (err) {
    formatErrors(err, res)
  }
}

/**
 * Formatta i filtri per la ricerca dell'utente sulla base
 * dello schema definito in `Constants.USER_FILTERS_SCHEMA`
 * @param {ExpressRequestQuery} query
 * @return {object} L'insieme dei filtri per la ricerca dell'utente
 */
const getUserFilters = (query = {}) => {
  const filters = {};
  Object.entries(query).forEach(([key, value]) => {
    if (USER_FILTERS_SCHEMA[key]) {
      if (USER_FILTERS_SCHEMA[key].type === "array") {
        if (USER_FILTERS_SCHEMA[key].isObjectID) value = value.trim().split(';').map(s => mongoose.Types.ObjectId(s)); // es: ?skills=123123123123;234234234234234234;4356456456456456 -> [123123123123, 234234234234234234, 4356456456456456]
        filters[key] = { [key]: { $in: value } }; // es: { skills: { $in: [ObjectId("123123123123123"), ObjectId("123123123123123"),ObjectId("...")] } }
      } else {
        if (USER_FILTERS_SCHEMA[key].isObjectID) value = mongoose.Types.ObjectId(value);
        filters[key] = { [key]: value };
      }
    }
  });
  return filters;
}

module.exports = {
  getUserData,
  getUserFilters,
}
