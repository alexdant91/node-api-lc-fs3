const fs = require('fs');
const path = require('path');

const { USER_MIN_DATA_TO_PROFILE_COMPLETE, USER_PROFILE_IMAGE_PERMITTED_EXT } = require('../api/constants/user');

/**
 * Rimuovi tutti i dati impostati come false escluso quelli specificati
 * @param {object} payload Oggetto che rappresenta il req.body passato dall'utente
 * @param {array} excluded Chiavi da ignorare nel check
 */
const clearUserUpdatePayload = (payload = {}, excluded = []) => {
  Object.entries(payload).forEach(([key, value]) => {
    if (excluded.indexOf(key) === -1 && value == false) delete payload[key];
  });
}

/**
 * Controllo se i dati dell'utente sono fillati o meno
 * in base allo schema impostato nelle `Constants.USER_MIN_DATA_TO_PROFILE_COMPLETE`
 * @param {UserObject} user
 * @returns {boolean} `true` or `false`
 */
const isUserProfileComplete = (user) => {
  const schema = USER_MIN_DATA_TO_PROFILE_COMPLETE;
  const results = [];
  Object.entries(user).forEach(([key, value]) => {
    if (schema[key]) {
      if (schema[key].type === "array") {
        if (value.length === 0) results.push(false);
      } else {
        if (value == undefined || value == null) results.push(false);
      }
    }
  });
  return !results.some((item) => item == false);
}

/**
 * Salvare l'immagine del profilo nella cartella uploads
 * Acceta solo alcuni formati immagine specificati in `Constants.USER_PROFILE_IMAGE_PERMITTED_EXT`
 * @param {object} profile_image
 * @returns {string} Link di accesso all'immagine
 */
const saveProfileImage = (profile_image = { content: "", file_name: "" }, user_id) => {
  try {
    const content = Buffer.from(profile_image.content, 'base64').toString('ascii');
    const file_name = profile_image.file_name;
    const ext = file_name.spli('.').at(-1); // mio_file.immagine.profilo.jpg -> ['mio_file', 'immagine', 'profilo', 'jpg'] -> 'jpg'

    if (USER_PROFILE_IMAGE_PERMITTED_EXT.indexOf(ext) === -1) throw new Error("Image format not permitted");

    const dir_path = path.join(__dirname, `../uploads/profile_image/${user_id}`);
    const file_path = `${dir_path}/${file_name}`;

    // Crea la cartella con l'id dell'utente dentro `/uploads/profile_image` se non esiste
    if (!fs.existsSync(dir_path)) fs.mkdirSync(dir_path);

    fs.writeFileSync(file_path, content);

    return `${process.env.SERVER_HOST}/api/me/profile_image/${user_id}/${file_name}`;

  } catch (err) {
    throw err;
  }
}

module.exports = {
  clearUserUpdatePayload,
  isUserProfileComplete,
  saveProfileImage,
}
