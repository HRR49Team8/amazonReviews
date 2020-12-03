const faker = require('faker');
const { s3AvatarDomain, randomAvatars, s3domain, s3Urls } = require('./assets/S3Info.js');
const { data } = require('./assets/fakerData.json');

const getRandomItems = () => {
  const randomProductName = faker.commerce.productName();
  const randomDate = faker.date.past(5, '2020-11-13');
  const headline = faker.random.words(Math.floor(Math.random() * 4) + 2);
  const full_text = faker.random.words(Math.floor(Math.random() * (45 - 22)) + 22);
  return { randomProductName, randomDate, headline, full_text };
};

const insertProduct = () => {
  const { randomProductName } = data[Math.floor(Math.random() * 1000)];
  return `${randomProductName}\n`;
};

const insertUser = (i) => {
  const randomUserName = faker.internet.userName();
  const randomCountry = (Math.random() <= 0.7) ? 'the United States' : faker.address.country();
  const randomAvatar = s3AvatarDomain + randomAvatars[i - 1];

  return `${randomUserName},${randomCountry},${randomAvatar}\n`;
};

// Roughly mimics average distribution of Amazon reviews
const one = new Array(14).fill(1);
const two = new Array(6).fill(2);
const three = new Array(8).fill(3);
const four = new Array(18).fill(4);
const five = new Array(54).fill(5);
const merged = [...one, ...two, ...three, ...four, ...five];

// Create 0-20 reviews per product
const insertReviews = (productIndex) => {
  let result = '';
  // for each product_id, create a random number of reviews for each product
  const numberOfReviews = Math.floor(Math.random() * 21);
  for (let j = 0; j < numberOfReviews; j++) {
    const product_id = productIndex;
    const user_id = Math.floor(Math.random() * 100) + 1;
    const overall_rating = merged[Math.floor(Math.random() * 100)];
    const review_date = data[Math.floor(Math.random() * 1000)].randomDate;
    const { headline } = data[Math.floor(Math.random() * 1000)];
    const { full_text } = data[Math.floor(Math.random() * 1000)];
    const helpful = Math.floor(Math.random() * 40);
    const verified_purchase = (Math.random() <= 0.7) ? 1 : 0;
    let product_photo = null;
    if (Math.random() >= 0.75) {
      product_photo = s3domain + s3Urls[Math.floor(Math.random() * 20)];
    }

    result += `${product_id},${user_id},${overall_rating},${review_date},${headline},${full_text},${helpful},${verified_purchase},${product_photo}\n`;
  }
  return result;
};

module.exports = {
  insertProduct,
  insertUser,
  insertReviews,
  getRandomItems,
};
