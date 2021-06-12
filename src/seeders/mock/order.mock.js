// eslint-disable-next-line import/no-extraneous-dependencies
const faker = require("faker");
const moment = require("moment");

const randomItemInArray = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getOrderData = async (users, vendors, meals) => {
  const orderData = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= 100; i++) {
    const order = {
      slug: faker.lorem.slug(),
      code: faker.lorem.slug(),
      price: faker.commerce.price(),
      reason: faker.lorem.sentence(),
      user: randomItemInArray(users)._id,
      vendor: randomItemInArray(vendors)._id,
      meals: [
        { meal: randomItemInArray(meals)._id },
        { meal: randomItemInArray(meals)._id },
        { meal: randomItemInArray(meals)._id },
      ],
      deliveryDetails: {
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        address: faker.address.streetAddress(),
        phoneNumber: faker.phone.phoneNumber(),
      },
      status: randomItemInArray([
        "PENDING",
        "ACCEPTED",
        "IN_TRANSIT",
        "DELIVERED",
        "REJECTED",
        "RECIEVED",
      ]),
      createdAt: moment(
        faker.date.between("2021-01-01", "2021-03-15")
      ).format(),
    };

    orderData.push(order);
  }

  return orderData;
};

module.exports = {
  getOrderData,
};
