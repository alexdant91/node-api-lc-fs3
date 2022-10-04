const jwt = require('jsonwebtoken');

const { SERVER_PRIVATE_KEY } = process.env;

/**
 * Ottengo un nuovo token per l'utente
 * @param {object} payload Oggetto da criptare
 * @returns {string} Il token di sicurezza
 */
const genToken = (payload) => {
  try {
    return jwt.sign(payload, SERVER_PRIVATE_KEY);
  } catch (err) {
    throw err;
  }
};

/**
 * Verifico l'effettiva validità del token
 * @param {string} token Il token da verificare
 * @returns {payload|Error} Il payload decriptato oppure un errore se il token non è valido
 */
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
