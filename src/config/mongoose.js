const mongoose = require("mongoose");
const logger = require("../helpers/logger");
require("dotenv").config();
mongoose.Promise = global.Promise;
mongoose
  .connect(
    process.env.ENVIRONMENT === "test"
      ? process.env.DB_CONN_TEST
      : process.env.DB_CONN,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )
  .then((res) => {
    logger.info("Database Connected successfully");
  })
  .catch((err) => {
    logger.error("Not connected");
    logger.error(err);
  });

module.exports = { mongoose };
