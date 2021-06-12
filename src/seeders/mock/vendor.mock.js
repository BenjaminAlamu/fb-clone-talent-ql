// eslint-disable-next-line import/no-extraneous-dependencies
const faker = require("faker");
const ngfaker = require("ng-faker");

const randomItemInArray = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getVendorData = async (userIDs, categories) => {
  const vendorData = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < userIDs.length; i++) {
    const vendor = {
      user: userIDs[i]._id,
      accountInfo: {
        accountNum: ngfaker.account.accountNumber(),
        bankCode: ngfaker.random.number(),
        bankName: ngfaker.account.bank(),
      },
      restaurant: {
        name: ngfaker.name.fullName(),
        slug: ngfaker.lorem.word(),
        address: faker.address.streetAddress(),
        image: faker.image.imageUrl(),
        state: ngfaker.address.state(),
        website: ngfaker.lorem.word(),
        twitter: ngfaker.lorem.word(),
        instagram: ngfaker.lorem.word(),
        category: randomItemInArray(categories)._id,
      },
    };

    vendorData.push(vendor);
  }

  return vendorData;
};

module.exports = {
  getVendorData,
};
