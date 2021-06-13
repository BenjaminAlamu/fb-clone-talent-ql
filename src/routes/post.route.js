const express = require("express");
const validate = require("../helpers/validate");
const postController = require("../controllers/post.controller");
const postValidation = require("../policies/post.policy");
const { authService } = require("../services");

const router = express.Router();

router.post(
  "/create",
  [authService.validateToken, validate(postValidation.createPost)],
  postController.createPost
);

router.get("/more", postController.more);

router.get("/all", [authService.validateToken], postController.list);

router.put(
  "/update/:_id",
  [authService.validateToken, validate(postValidation.createPost)],
  postController.edit
);

router.get("/:_id", [authService.validateToken], postController.listOne);

router.delete(
  "/delete/:_id",
  [authService.validateToken],
  postController.deletePost
);

module.exports = router;
