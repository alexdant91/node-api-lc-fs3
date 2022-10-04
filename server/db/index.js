const mongoose = require('mongoose');

const { MONGODB_CONNECTION_URL } = process.env;

const connect = () => mongoose.connect(MONGODB_CONNECTION_URL, (err) => {
  if (err) throw err;
  console.log('[SERVER]: MongoDB successfully connected...');
});

const disconnect = async () => {
  try {
    await mongoose.disconnect();
  } catch (err) {
    throw err;
  }
};

const models = {
  User: require('./models/User'),
  Skill: require('./models/Skill'),
  WorkExperience: require('./models/WorkExperience'),
  Language: require('./models/Language'),
  Role: require('./models/Role'),
}

module.exports = {
  connect,
  disconnect,
  ...models,
}
