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
  uploadImage: async function (files) {
    try {
      let imageUrls = [];
      /* eslint-disable no-await-in-loop */
      for (let i = 0; i < files.length; i += 1) {
        const file = files[i];

        const uploadedImagePath = path.resolve(`./uploads/${file.name}`);
        await file.mv(uploadedImagePath);
        let res = await cloudinary.uploader.upload(uploadedImagePath);
        imageUrls = [...imageUrls, res.secure_url];
      }
      /* eslint-disable no-await-in-loop */
      return imageUrls;
    } catch (error) {
      logger.error(error);
    }
  },
};
