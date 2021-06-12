const catchAsync = require("../helpers/catchAsync");
const { postService } = require("../services");
const ApiError = require("../helpers/ApiError");
const pick = require("../helpers/pick");
const { Post } = require("../models");

const createPost = catchAsync(async function (req, res) {
  const post = await postService.createPost(req);
  res.status(201).send({
    message: "Post created successfully",
    data: {
      post,
    },
  });
});

const edit = catchAsync(async function (req, res) {
  const meal = await postService.updatePost(req.params._id, req);

  res.status(200).send({
    message: "Meal updated successfully",
    data: {
      meal,
    },
  });
});

const list = catchAsync(async function (req, res) {
  const filter = { user: req.user, isDeleted: false };
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const { posts, page } = await postService.fetchPosts(filter, options);
  const count = await postService.count(filter);
  res.status(200).send({
    status: "success",
    message: "Posts Fetched successfully",
    data: {
      count,
      currentPage: page,
      posts,
    },
  });
});

const listOne = catchAsync(async function (req, res) {
  const post = await postService.findOne({
    _id: req.params._id,
    isDeleted: false,
    user: req.user,
  });
  if (!post) {
    throw new ApiError(404, "Post not found");
  }
  res.status(200).send({
    status: "success",
    message: "Post fetched Successfully",
    data: {
      post,
    },
  });
});

const deletePost = catchAsync(async function (req, res) {
  const post = await postService.deletePost(req.params._id);

  res.status(200).send({
    message: "Post deleted successfully",
    data: {
      post,
    },
  });
});

module.exports = {
  createPost,
  edit,
  list,
  deletePost,
  listOne,
};
