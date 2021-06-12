const emailHelper = require("../helpers/email");
const ApiError = require("../helpers/ApiError");
const catchAsync = require("../helpers/catchAsync");
const cloudinaryHelper = require("../helpers/cloudinary");
const pick = require("../helpers/pick");

const {
  authService,
  vendorService,
  tokenService,
  emailService,
} = require("../services");

const register = catchAsync(async function (req, res) {
  const user = await authService.register(req.body);
  if (req.body.type === "VENDOR") {
    await vendorService.createVendor(user._id);
  }
  const tokens = await tokenService.generateAuthTokens(user, true);
  emailHelper.sendRegister(user, tokens.emailToken.token);
  res.status(201).send({
    message: "Registration successful",
    data: {
      user,
      token: tokens.access.token,
    },
  });
});

const registerVendorAssistant = catchAsync(async function (req, res) {
  const user = await authService.register({
    ...req.body,
    type: "VENDOR_ASSISTANT",
    vendor: req.vendor._id,
  });
  const tokens = await tokenService.generateAuthTokens(user, true);
  emailHelper.sendRegister(user, tokens.emailToken.token);
  res.status(201).send({
    message: "Registration successful",
    data: {
      user,
      token: tokens.access.token,
    },
  });
});

const registerAdmin = catchAsync(async function (req, res) {
  const user = await authService.register({
    ...req.body,
    type: "ADMIN",
  });
  const tokens = await tokenService.generateAuthTokens(user, true);
  emailHelper.sendRegister(user, tokens.emailToken.token);
  res.status(201).send({
    message: "Registration successful",
    data: {
      user,
      token: tokens.access.token,
    },
  });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await authService.login(email, password);

  const token = await tokenService.generateAuthTokens(user);

  res.status(200).send({
    message: "Login successful",
    data: {
      user,
      token: token.access.token,
    },
  });
});

const resendToken = catchAsync(async (req, res) => {
  const tokens = await tokenService.generateResendTokens(req.user);
  emailHelper.sendRegister(req.user, tokens.emailToken.token);
  res.status(201).send({
    message: "Email sent successfully",
    data: {
      token: tokens.emailToken.token,
    },
  });
});

const emailVerification = catchAsync(async (req, res) => {
  try {
    const user = await authService.emailVerification(req.user.email);
    res.send({
      message: "Account activated successfully",
      user,
    });
  } catch (error) {
    const message = error.message || error;
    const code = error.code || 500;
    throw new ApiError(code, message);
  }
});

const forgotPassword = catchAsync(async (req, res) => {
  const user = JSON.parse(
    JSON.stringify(await authService.getUserByEmail(req.body.email))
  );

  const resetPasswordToken = await tokenService.generateResetPasswordToken(
    user.email
  );
  emailHelper.sendReset(user, resetPasswordToken);
  res.status(200).send({
    message: "Please check your email",
    data: {},
  });
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.body.resetToken, req.body.password);
  res.status(204).send({
    message: "Password reset successful",
    data: {},
  });
});

const updatePassword = catchAsync(async (req, res) => {
  await authService.updatePassword(
    req.user.email,
    req.body.oldPassword,
    req.body.newPassword
  );
  res.status(200).send({
    message: "Password updated succesfully",
    data: {},
  });
});

const updateUserById = catchAsync(async (req, res) => {
  if (req.body.password) {
    throw new ApiError(400, "You can't update your password here");
  }
  await authService.updateUserById(req.user._id, req.body);
  res.status(200).send({
    message: "User updated succesfully",
    data: {},
  });
});

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
  register,
  login,
  emailVerification,
  forgotPassword,
  resetPassword,
  updatePassword,
  resendToken,
  getUser,
  registerVendorAssistant,
  registerAdmin,
  uploadImages,
  getUsers,
  updateUserById,
};
