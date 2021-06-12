const Joi = require("@hapi/joi");

const createPost = {
  body: Joi.object().keys({
    content: Joi.string().required().messages({
      "string.empty": `Post Content cannot be an empty field`,
      "any.required": `Post Content is a required field`,
    }),
  }),
};

module.exports = {
  createPost,
};
