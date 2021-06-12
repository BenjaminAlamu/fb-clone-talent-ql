const mongoose = require("mongoose");
const logger = require("../helpers/logger");
require("dotenv").config();
const { User, Category, Vendor, Menu, Meal, Order } = require("../models");
const { genericUsers } = require("./mock/users.mock");
const { createCategories } = require("./mock/category.mock");
const { getVendorData } = require("./mock/vendor.mock");
const { getMenuData } = require("./mock/menu.mock");
const { getMealData } = require("./mock/meal.mock");
const { getOrderData } = require("./mock/order.mock");

const connectDB = async () => {
  logger.info("connecting to db");

  await mongoose.connect(process.env.DB_CONN, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
};

const clearDB = async () => {
  logger.warn("clearing db");
  await Promise.all(
    Object.values(mongoose.connection.collections).map(async (collection) =>
      collection.deleteMany()
    )
  );
  await User.deleteMany();
};

const disconnectDB = async () => {
  logger.warn("disconnecting from db");
  await mongoose.disconnect();
};

const seedDB = async () => {
  try {
    logger.info("running seeder");
    await connectDB();
    await clearDB();

    logger.info("Creating Users");
    const fakeusers = await User.create(
      await genericUsers("password", "USER", 10, "primary-user@mealguru.app")
    );

    logger.info("Creating Categories");
    const categories = await Category.create(await createCategories());

    logger.info("Creating Vendors");
    const fakeVendors = await User.create(
      await genericUsers("password", "VENDOR", 5, "primary-vendor@mealguru.app")
    );
    const vendorUsers = await Vendor.create(
      await getVendorData(fakeVendors, categories)
    );
    logger.info("Creating Admin");
    const fakeAdmin = await User.create(
      await genericUsers("password", "ADMIN", 1, "admin@mealguru.app")
    );
    logger.info("Creating Super Admin");
    const fakeSuperAdmin = await User.create(
      await genericUsers(
        "password",
        "SUPER_ADMIN",
        1,
        "primary-admin@mealguru.app"
      )
    );
    logger.info("Creating Menus");
    const menus = await Menu.create(await getMenuData(vendorUsers));

    logger.info("Creating Meals");
    const meals = await Meal.create(
      await getMealData(categories, vendorUsers, menus)
    );

    logger.info("Creating Orders");
    const orders = await Order.create(
      await getOrderData(fakeusers, vendorUsers, meals)
    );

    logger.info("seeder completed");
  } catch (e) {
    logger.error(e);
  }

  await disconnectDB();
};

seedDB();
