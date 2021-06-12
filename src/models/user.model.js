const mongoose = require("mongoose");
let Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
  pin: {
    type: Number,
  },
  password: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    trim: true,
  },
  accountConfirmed: {
    type: Boolean,
    default: false,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", userSchema);

userSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret.password;
    return ret;
  },
});

userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  const user = await this.findOne({
    $and: [{ email, _id: { $ne: excludeUserId } }, { email: { $ne: null } }],
  });
  return !!user;
};

/**
 * Check if mobile number is taken
 * @param {string} mobile - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
// userSchema.statics.isNumberTaken = async function (mobile, excludeUserId) {
//   const user = await this.findOne({
//     $and: [{ mobile, _id: { $ne: excludeUserId } }, { mobile: { $ne: null } }],
//   });
//   return !!user;
// };

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});
module.exports = User;
