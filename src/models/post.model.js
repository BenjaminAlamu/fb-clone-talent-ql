const mongoose = require("mongoose");
const moment = require("moment");
let Schema = mongoose.Schema;

var postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    images: [{ type: String }],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
