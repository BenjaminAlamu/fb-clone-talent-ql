// eslint-disable-next-line import/no-extraneous-dependencies
const faker = require("faker");
const ngfaker = require("ng-faker");

const getMenuData = async (vendorIDs) => {
  const menuData = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= 10; i++) {
    let randIndex = 10 % i;
    const vendor = {
      vendor: vendorIDs[randIndex]._id,
      name: faker.commerce.productName(),
      slug: ngfaker.lorem.word(),
    };

    menuData.push(vendor);
  }

  return menuData;
};

module.exports = {
  getMenuData,
};
