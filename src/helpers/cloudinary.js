const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");
const logger = require("../helpers/logger");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
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
        fs.unlinkSync(uploadedImagePath);
      }
      /* eslint-disable no-await-in-loop */
      return imageUrls;
    } catch (error) {
      logger.error(error);
    }
  },
};
