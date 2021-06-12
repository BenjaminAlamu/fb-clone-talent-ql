const ApiError = require("../helpers/ApiError");

const catchAsync = require("../helpers/catchAsync");
const cloudinaryHelper = require("../helpers/cloudinary");
const pick = require("../helpers/pick");

const { authService } = require("../services");

const getUser = catchAsync(async (req, res) => {
  let user;
  if (req.query.user) {
    user = JSON.parse(
      JSON.stringify(await authService.getUserById(req.query.user))
    );
  } else {
    user = JSON.parse(
      JSON.stringify(await authService.getUserById(req.user._id))
    );
  }

  res.status(200).send({
    message: "User details fetched successfully",
    data: {
      user,
    },
  });
});

const uploadImages = catchAsync(async (req, res) => {
  if (!req.files) {
    throw new ApiError(400, "You to add a file");
  }
  const result = await cloudinaryHelper.uploadImage(req.files.image);
  return res.status(200).send({
    message: "Image Uploaded successfully",
    image: result.secure_url,
  });
});

const getUsers = catchAsync(async function (req, res) {
  const filter = pick(req.query, ["type"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const { users, page } = await authService.fetchUsers(
    JSON.parse(JSON.stringify(filter)),
    options
  );
  const count = await authService.count(filter);
  res.status(200).send({
    status: "success",
    message: "Users Fetched successfully",
    data: {
      count,
      currentPage: page,
      users,
    },
  });
});

module.exports = {
  getUser,
  uploadImages,
  getUsers,
};
