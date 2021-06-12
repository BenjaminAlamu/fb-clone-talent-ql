// eslint-disable-next-line import/no-extraneous-dependencies
const faker = require("faker");

const getPostsData = async (users) => {
  const postData = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= 200; i++) {
    const meal = {
      content: faker.lorem.paragraphs(),
      images: faker.image.imageUrl(),
      user: faker.random.arrayElement(users),
    };

    postData.push(meal);
  }

  return postData;
};

module.exports = {
  getPostsData,
};
