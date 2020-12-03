const path = require('path');
const fs = require('fs');

const { writeCSV } = require('./CSVWriter.js');
const { insertProduct, insertUser, insertReviews } = require('./createRandomData.js');

// --------------------------- WRITE USERS --------------------------- //

console.log('Starting to write information to csv...');
console.time();

// I think 100-1000 users is fine - doesn't affect our dataset too much!
const userLines = 100;
const userFile = path.join(__dirname, '/users.csv');
const userStream = fs.createWriteStream(userFile);

// Header
const userHeader = 'user_name,country,avatar\n';
userStream.write(userHeader, 'utf-8');

// Data
writeCSV(userStream, userLines, insertUser, 'utf-8', () => { userStream.end(); });

// --------------------------- WRITE PRODUCTS --------------------------- //

// We'll want 1,000-1,000,000 products.
const prodLines = 1000000; // CHANGE this line when ready!
const prodFile = path.join(__dirname, '/products.csv');
const prodStream = fs.createWriteStream(prodFile);

// Header
const prodHeader = 'product_name\n';
prodStream.write(prodHeader, 'utf-8');

// Data
writeCSV(prodStream, prodLines, insertProduct, 'utf-8', () => { prodStream.end(); });

// --------------------------- WRITE REVIEWS --------------------------- //

// Use prodLines. With 1000-1,000,000 products, we will get ~10,000-10,000,000 reviews total.
const reviewFile = path.join(__dirname, '/reviews.csv');
const reviewStream = fs.createWriteStream(reviewFile);

// Header
const header = 'product_id,user_id,overall_rating,review_date,headline,full_text,helpful,verified_purchase,product_photo\n';
reviewStream.write(header, 'utf-8');

// Data
writeCSV(reviewStream, prodLines, insertReviews, 'utf-8', () => {
  console.log('Finished writing!');
  console.timeEnd();
  reviewStream.end();
});
