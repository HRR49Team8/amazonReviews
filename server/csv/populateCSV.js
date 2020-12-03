const path = require('path');
const fs = require('fs');

const { writeCSV } = require('./CSVWriter.js');
const { isPostgres } = require('./config.js');
const { insertProduct, insertUser, insertReviews } = require('./createRandomData.js');

// --------------------------- WRITE USERS --------------------------- //

console.log('Starting to write information to csv...');
console.time();

// I think 100-1000 users is fine - doesn't affect our dataset too much!
const userLines = 100;
const userFile = isPostgres ? '/users.csv' : '/C_users.csv';
const userPath = path.join(__dirname, userFile);
const userStream = fs.createWriteStream(userPath);

// Header
const h1 = 'user_name,country,avatar\n';
const userHeader = isPostgres ? h1 : `id,${h1}`;
userStream.write(userHeader, 'utf-8');

// Data
writeCSV(userStream, userLines, insertUser, 'utf-8', () => { userStream.end(); });

// --------------------------- WRITE PRODUCTS --------------------------- //

// We'll want 1,000-1,000,000 products.
const prodLines = 1000000; // CHANGE this line when ready!
const prodFile = isPostgres ? '/products.csv' : '/C_products.csv';
const prodPath = path.join(__dirname, prodFile);
const prodStream = fs.createWriteStream(prodPath);

// Header
const prodHeader = isPostgres ? 'product_name\n' : 'id,product_name\n';
prodStream.write(prodHeader, 'utf-8');

// Data
writeCSV(prodStream, prodLines, insertProduct, 'utf-8', () => { prodStream.end(); });

// --------------------------- WRITE REVIEWS --------------------------- //

// Use prodLines. With 1000-1,000,000 products, we will get ~10,000-10,000,000 reviews total.
const reviewFile = isPostgres ? '/reviews.csv' : '/C_reviews.csv';
const reviewPath = path.join(__dirname, reviewFile);
const reviewStream = fs.createWriteStream(reviewPath);

// Header
const h3 = 'product_id,user_id,overall_rating,review_date,headline,full_text,helpful,verified_purchase,product_photo\n';
const reviewHeader = isPostgres ? h3 : `id,${h3}`;
reviewStream.write(reviewHeader, 'utf-8');

// Data
writeCSV(reviewStream, prodLines, insertReviews, 'utf-8', () => {
  console.log('Finished writing!');
  console.timeEnd();
  reviewStream.end();
});
