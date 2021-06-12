const express = require("express");
const authController = require("../controllers/auth.controller");
const { authService } = require("../services");

const router = express.Router();

router.get("/all", [authService.validateToken], authController.getUsers);

router.get("/", [authService.validateToken], authController.getUser);
module.exports = router;
