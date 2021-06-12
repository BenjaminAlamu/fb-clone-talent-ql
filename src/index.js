const express = require("express");
const app = express();

require("dotenv").config();
const port = process.env.PORT;
const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const listAllRoutes = require("express-list-endpoints");
const Table = require("cli-table");
const path = require("path");
const UPLOAD_PATH = path.join("./public/uploads");
const { errorConverter, errorHandler } = require("./helpers/error");
const logger = require("./helpers/logger");

app.use(cors("*"));

require("./config/mongoose");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// For multi form data
// app.use(upload.array());
app.use(fileUpload());

app.use("/api/v1", require("./routes/index"));

app.get("/", (req, res) =>
  res.status(200).send({
    message: "Welcome to FacebookClone API, you should not be here sha",
  })
);
app.get("*", (req, res) =>
  res.status(404).send({
    message: "Invalid route",
  })
);
app.use(express.static(UPLOAD_PATH));
// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

app.listen(port, () => {
  logger.info(`Server started at ${port}`);
});

let routesList = listAllRoutes(app);
routesList = routesList.map((route) => {
  const obj = {};
  obj[route.path] = route.methods.join(" | ");
  return obj;
});
const table = new Table();
table.push({ Endpoints: "Methods" }, ...routesList);

if (process.env.ENVIRONMENT === "dev") {
  logger.info(table.toString());
}
