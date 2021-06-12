const jwt = require("jsonwebtoken");
const SECRET_KEY = "BenjaminAlamu";

const signToken = payload =>
  new Promise((resolve, reject) => {
    jwt.sign(payload, SECRET_KEY, (err, token) => {
      if (err) {
        reject(err);
      }
      resolve(token);
    });
  });

const decodeToken = token =>
  new Promise((resolve, reject) => {
    const decoded = jwt.decode(token, SECRET_KEY, err => {
      if (err) {
        reject(err);
      }
    });
    resolve(decoded);
  });

module.exports = {
  signToken,
  decodeToken
};
