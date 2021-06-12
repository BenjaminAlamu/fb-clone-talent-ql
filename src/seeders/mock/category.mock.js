// eslint-disable-next-line import/no-extraneous-dependencies;
const slugify = require("slugify");

const categoryData = [
  {
    name: "Small Chops and Finger Food",
    image:
      "https://res.cloudinary.com/dldd8ucby/image/upload/v1615667204/mealguruu/small-chops.jpg",
  },
  {
    name: "Cakes and Confectionary",
    image:
      "https://res.cloudinary.com/dldd8ucby/image/upload/v1615667198/mealguruu/cakes.jpg",
  },
  {
    name: "Soups and Sauces",
    image:
      "https://res.cloudinary.com/dldd8ucby/image/upload/v1615667195/mealguruu/soups.jpg",
  },
  {
    name: "Meals",
    image:
      "https://res.cloudinary.com/dldd8ucby/image/upload/v1615667248/mealguruu/meals.jpg",
  },
  {
    name: "Packaged Food Products",
    image:
      "https://res.cloudinary.com/dldd8ucby/image/upload/v1615667192/mealguruu/package.jpg",
  },
];

const seedCategories = async () => {
  const categories = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < categoryData.length; i++) {
    const category = {
      ...categoryData[i],
      slug: slugify(categoryData[i].name, { lower: true }),
    };

    categories.push(category);
  }

  return categories;
};

const createCategories = async () => {
  // eslint-disable-next-line no-return-await
  return await seedCategories();
};

module.exports = {
  createCategories,
};
