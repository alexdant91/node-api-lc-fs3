const { verifyToken } = require('../utility/auth');
const { formatErrors } = require('../utility/errors');
const { getUserData } = require('../utility/user');

/**
 * Verifica del token utente
 * @param {object} options
 * @returns
 */
const authUser = (options = { extended: false, getPrefFromQuery: false, queryToken: false }) => async (req, res, next) => {
  // Set delle impostazioni mantenendo i valori di default
  const _options = { extended: false, getPrefFromQuery: false, queryToken: false, ...options };

  // Se viene passato il parametro ?extended=true aggiorna le options
  if (_options.getPrefFromQuery && req.query.extended) _options.extended = req.query.extended == "true";

  const bearerToken = _options.queryToken ? (req.headers['authorization'] || req.query.token || false) : (req.headers['authorization'] || false);

  if (_options.queryToken == false && bearerToken.startsWith("Bearer ") == false) return formatErrors(new Error("Not Authorized"), res);

  if (bearerToken === false) return formatErrors(new Error("Not Authorized"), res);

  const token = bearerToken.replace('Bearer ', '');

  try {
    const { _id } = verifyToken(token);

    const user = await getUserData(res, _id, _options.extended);

    if (user == null) return formatErrors(new Error("Not Authorized"), res);

    req.user = user;

    return next();
  } catch (err) {
    formatErrors(err, res);
  }
}

module.exports = {
  authUser,
}
