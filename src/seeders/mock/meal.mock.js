// eslint-disable-next-line import/no-extraneous-dependencies
const faker = require("faker");

const randomItemInArray = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getMealData = async (categories, vendors, menus) => {
  const mealData = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= 40; i++) {
    const meal = {
      name: faker.commerce.productName(),
      slug: faker.lorem.word(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      image: faker.image.imageUrl(),
      category: randomItemInArray(categories)._id,
      vendor: randomItemInArray(vendors)._id,
      menu: randomItemInArray(menus)._id,
    };

    mealData.push(meal);
  }

  return mealData;
};

module.exports = {
  getMealData,
};
