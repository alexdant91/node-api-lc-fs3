const jwt = require('jsonwebtoken');

const { SERVER_PRIVATE_KEY } = process.env;

const genToken = (payload) => {
  try {
    return jwt.sign(payload, SERVER_PRIVATE_KEY);
  } catch (err) {
    throw err;
  }
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, SERVER_PRIVATE_KEY); // -> new Error() || payload -> { _id: user._id, email: user.email }
  } catch (err) {
    throw err;
  }
}

module.exports = {
  genToken,
  verifyToken,
}
