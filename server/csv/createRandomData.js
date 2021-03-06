const faker = require('faker');

const { s3AvatarDomain, randomAvatars, s3domain, s3Urls } = require('./assets/S3Info.js');
const { data } = require('./assets/fakerData.json');
const { isPostgres } = require('./config.js');

// Returns random int from min to a non-inclusive max.
const rng = (max, min = 0) => Math.floor(Math.random() * (max - min)) + min;

const getRandomItems = async () => {
  const regex = /,/g;
  const randomProductName = faker.commerce.productName();
  const randomDate = faker.date.past(5, '2020-11-13');
  const headline = (await faker.random.words(rng(6, 2))).replace(regex, '');
  const full_text = (await faker.random.words(rng(21, 10))).replace(regex, '');
  const randomUserName = faker.internet.userName();
  const randomCountry = (Math.random() <= 0.7) ? 'the United States' : (await faker.address.country()).replace(regex, '');

  return { randomProductName, randomDate, headline, full_text, randomUserName, randomCountry };
};

const insertProduct = (i) => {
  const { randomProductName } = data[rng(1000)];
  return isPostgres ? `${randomProductName}\n` : `${i},${randomProductName}\n`;
};

const insertUser = (i) => {
  const { randomUserName } = data[rng(1000)];
  const { randomCountry } = data[rng(1000)];
  const randomAvatar = s3AvatarDomain + randomAvatars[rng(100)];

  const userInfo = `${randomUserName},${randomCountry},${randomAvatar}\n`;
  return isPostgres ? userInfo : `${i},${userInfo}`;
};

// Roughly mimics average distribution of Amazon reviews
const one = new Array(14).fill(1);
const two = new Array(6).fill(2);
const three = new Array(8).fill(3);
const four = new Array(18).fill(4);
const five = new Array(54).fill(5);
const merged = [...one, ...two, ...three, ...four, ...five];

let count = 0;
// Create 0-20 reviews per product
const insertReviews = (productIndex) => {
  let result = '';
  // for each product_id, create a random number of reviews for each product
  const numberOfReviews = rng(21);
  for (let j = 0; j < numberOfReviews; j++) {
    const product_id = productIndex;
    const user_id = rng(101, 1);
    const overall_rating = merged[rng(100)];
    const review_date = data[rng(1000)].randomDate;
    const { headline } = data[rng(1000)];
    const { full_text } = data[rng(1000)];
    const helpful = rng(40);
    const verified_purchase = (Math.random() <= 0.7) ? 1 : 0;
    let product_photo = null;
    if (Math.random() >= 0.75) {
      product_photo = s3domain + s3Urls[rng(20)];
    }
    count++;

    const reviewInfo = `${product_id},${user_id},${overall_rating},${review_date},${headline},${full_text},${helpful},${verified_purchase},${product_photo}\n`;
    result += isPostgres ? reviewInfo : `${count},${reviewInfo}`;
  }
  return result;
};

module.exports = {
  insertProduct,
  insertUser,
  insertReviews,
  getRandomItems,
};
