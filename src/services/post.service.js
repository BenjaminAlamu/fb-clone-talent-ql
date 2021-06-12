const { Post, Coupon } = require("../models");
const ApiError = require("../helpers/ApiError");
const cloudinaryHelper = require("../helpers/cloudinary");
const slugify = require("slugify");

const createPost = async (req) => {
  try {
    let images;
    if (req.files) {
      images = await processImages(req);
    }
    const data = { ...req.body, user: req.user, images };
    const post = await Post.create(data);
    return JSON.parse(JSON.stringify(post));
  } catch (error) {
    throw new ApiError(error.code || 500, error.message || error);
  }
};

const processImages = async (req) => {
  const images = await cloudinaryHelper.uploadImage(Object.values(req.files));
  return images;
};

const findOne = async (criteria) => {
  try {
    const post = await Post.findOne({ ...criteria });
    return JSON.parse(JSON.stringify(post));
  } catch (error) {
    throw new ApiError(error.code || 500, error.message || error);
  }
};

const fetchPosts = async (criteria = {}, options = {}) => {
  const { sort = { createdAt: -1 }, limit, page } = options;

  const _limit = parseInt(limit, 10);
  const _page = parseInt(page, 10);

  let posts = await Post.find(criteria)
    .sort(sort)
    .limit(_limit)
    .populate("user", "firstName lastName email phoneNumber ")
    .skip(_limit * (_page - 1));

  return { posts, page: _page };
};

const count = async (criteria = {}) => {
  return await Post.find(criteria).countDocuments();
};

const updatePost = async (postId, req) => {
  let post = await Post.findById(postId);
  if (!post || post.isDeleted) {
    throw new ApiError(404, "Post not found");
  }
  let data = req.body;
  if (req.files) {
    images = await processImages(req);
    data = { ...data, images };
  }

  Object.assign(post, data);
  await post.save();
  return post;
};

const deletePost = async (postId) => {
  const post = await Post.findById(postId);
  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  Object.assign(post, { isDeleted: true });
  await post.save();
  return post;
};

module.exports = {
  createPost,
  findOne,
  processImages,
  fetchPosts,
  count,
  updatePost,
  deletePost,
};
