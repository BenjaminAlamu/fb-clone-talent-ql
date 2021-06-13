const jwt = require("jsonwebtoken");
require("dotenv").config();

const signToken = (payload) =>
  new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.SECRET_KEY, (err, token) => {
      if (err) {
        reject(err);
      }
      resolve(token);
    });
  });

const decodeToken = (token) =>
  new Promise((resolve, reject) => {
    const decoded = jwt.decode(token, process.env.SECRET_KEY, (err) => {
      if (err) {
        reject(err);
      }
    });
    resolve(decoded);
  });

module.exports = {
  signToken,
  decodeToken,
};
