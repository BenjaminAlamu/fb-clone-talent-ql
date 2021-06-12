const express = require("express");
const router = new express.Router();
const authController = require("../controllers/auth.controller");

const userRouter = require("./user.route.js");
const authRouter = require("./auth.route.js");
router.post("/upload/files", authController.uploadImages);
router.use("/user", userRouter);
router.use("/auth", authRouter);
module.exports = router;
