const express = require("express");
const validate = require("../helpers/validate");
const authController = require("../controllers/auth.controller");
const authValidation = require("../policies/auth.policy");
const { authService } = require("../services");

const router = express.Router();

router.post(
  "/register",
  [validate(authValidation.register)],
  authController.register
);

router.post("/login", [validate(authValidation.login)], authController.login);
module.exports = router;

router.post(
  "/account/confirm",
  [authService.validateToken, validate(authValidation.confirmAccount)],
  authController.emailVerification
);

router.post(
  "/account/resend",
  [validate(authValidation.resendMail)],
  authController.resendToken
);

router.post(
  "/forgot/password",
  [validate(authValidation.forgotPassword)],
  authController.forgotPassword
);

router.post(
  "/reset/password",
  [validate(authValidation.resetPassword)],
  authController.resetPassword
);

router.put(
  "/update/password",
  [validate(authValidation.updatePassword), authService.validateToken],
  authController.updatePassword
);

router.put(
  "/update/user",
  [authService.validateToken],
  authController.updateUserById
);

router.get("/users", [authService.validateToken], authController.getUsers);

router.get("/", [authService.validateToken], authController.getUser);
module.exports = router;
