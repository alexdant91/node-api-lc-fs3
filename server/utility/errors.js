const { SERVER_MODE } = process.env;

/**
 * Format dell'errore che proviene da db o server
 * @param {Error} err
 * @param {ExpressResponse} res
 * @returns {void}
 */
const formatErrors = (err, res) => {
  console.log(err);
  return res.status(500).json({ message: SERVER_MODE === "development" ? err.message : "Internal Server Error" });
}

module.exports = {
  formatErrors,
}
