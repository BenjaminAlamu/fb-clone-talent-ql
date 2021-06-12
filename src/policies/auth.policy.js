const Joi = require("@hapi/joi");

const login = {
  body: Joi.object().keys({
    email: Joi.string().required().messages({
      "string.empty": `Email cannot be an empty field`,
      "any.required": `Email is a required field`,
    }),
    password: Joi.string().required().messages({
      "string.empty": `Password cannot be an empty field`,
      "any.required": `Password is a required field`,
    }),
  }),
};

const register = {
  body: Joi.object().keys({
    fullName: Joi.string().required().messages({
      "string.empty": `Full Name cannot be an empty field`,
      "any.required": `Full Name is a required field`,
    }),
    password: Joi.string().required().messages({
      "string.empty": `Password cannot be an empty field`,
      "any.required": `Password is a required field`,
    }),
    email: Joi.string().required().messages({
      "string.empty": `Email cannot be an empty field`,
      "any.required": `Email is a required field`,
    }),
    phoneNumber: Joi.string().required().messages({
      "string.empty": `Phone Number cannot be an empty field`,
      "any.required": `Phone Number is a required field`,
    }),
    type: Joi.string()
      .valid("ADMIN", "USER", "VENDOR", "SUPER_ADMIN")
      .messages({
        "string.empty": `Type is a required field`,
        "any.only": `Invalid User type passed`,
      }),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": `Email cannot be an empty field`,
      "any.required": `Email is a required field`,
      "string.email": `You need to enter a valid email`,
    }),
  }),
};

const resetPassword = {
  body: Joi.object().keys({
    password: Joi.string().min(8).max(20).required().messages({
      "string.empty": `Password cannot be an empty field`,
      "string.min": `Password should have a minimum length of {#limit}`,
      "string.max": `Password should have a maximum length of {#limit}`,
      "any.required": `Password is a required field`,
    }),
    resetToken: Joi.string().required().messages({
      "string.empty": `Token cannot be an empty field`,
      "any.required": `Token is a required field`,
    }),
  }),
};

const updatePassword = {
  body: Joi.object().keys({
    newPassword: Joi.string().min(8).max(20).required().messages({
      "string.empty": `New Password cannot be an empty field`,
      "string.min": `New Password should have a minimum length of {#limit}`,
      "string.max": `New Password should have a maximum length of {#limit}`,
      "any.required": `New Password is a required field`,
    }),
    oldPassword: Joi.string().required().messages({
      "string.empty": `Old Password cannot be an empty field`,
      "any.required": `Old Password is a required field`,
    }),
  }),
};
const resendMail = {
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": `Email cannot be an empty field`,
      "any.required": `Email is a required field`,
      "string.email": `You need to enter a valid email`,
    }),
  }),
};

module.exports = {
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  register,
};
