const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");
const logger = require("../helpers/logger");

cloudinary.config({
  cloud_name: "dldd8ucby",
  api_key: "782219581314631",
  api_secret: "TvN5GDTv8HFqFwkd1O1x9ORPZs8",
});

module.exports = {
  uploadImage: async function (image) {
    try {
      const featureImagePath = await path.resolve(`./uploads/${image.name}`);
      await image.mv(featureImagePath);
      return new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload(featureImagePath)
          .then((result) => {
            fs.unlinkSync(featureImagePath);
            resolve(result);
          })
          .catch((error) => {
            logger.error(error);
            reject(error);
          });
      });
    } catch (error) {
      logger.error(error);
    }
  },
};
