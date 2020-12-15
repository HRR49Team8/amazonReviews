const { promisify } = require('util');
const { pool, client } = require('./index.js');

const redisGet = promisify(client.get).bind(client);
const redisSet = promisify(client.set).bind(client);
// const rpush = promisify(client.rpush).bind(client);

const getReviews = async (id) => {
  const queryString = `
  SELECT r.product_id, r.user_id,
  r.overall_rating, r.review_date,
  r.headline, r.full_text, r.helpful, r.verified_purchase, r.product_photo,
  u.user_name, u.country, u.avatar
  FROM reviews AS r
  INNER JOIN users AS u
  ON r.user_id=u.id
  WHERE r.product_id= $1;`;

  const redis = await redisGet(`revProdId${id}`);
  if (redis) return JSON.parse(redis);

  let response;
  try {
    response = await pool.query(queryString, [id]);
  } catch (e) {
    console.error(e);
    throw (e);
  }
  await redisSet(`revProdId${id}`, JSON.stringify(response.rows));

  return response.rows;
};

// const postReview = async (body) => {
//   const toPost = JSON.stringify(body);
//   let response;
//   try {
//     response = await rpush('reviewqueue', toPost);
//   } catch (e) {
//     console.error(e);
//     throw (e);
//   }
//   return response;
// };
const postReview = async (body) => {
  const queryString = `
  INSERT INTO reviews(product_id, product_photo, user_id, overall_rating,
  review_date, headline, full_text, helpful, verified_purchase)
  VALUES ($1, $2, (SELECT id FROM users WHERE
  users.user_name = $3 limit 1), $4, $5, $6, $7, $8, $9);`;
  const {
    product_id, user_name, overall_rating, review_date,
    headline, full_text, helpful, verified_purchase, product_photo,
  } = body;

  const params = [
    product_id, product_photo, user_name, overall_rating,
    review_date, headline, full_text, helpful, verified_purchase,
  ];

  let response;
  try {
    response = await pool.query(queryString, params);
  } catch (e) {
    console.error(e);
    throw (e);
  }
  return response;
};

const updateReview = async (params) => {
  const queryString = 'UPDATE reviews SET overall_rating = $1, headline = $2, full_text = $3 WHERE id = $4 AND product_id = $5';

  let response;
  try {
    response = await pool.query(queryString, params);
  } catch (e) {
    console.error(e);
    throw (e);
  }
  return response;
};

const deleteReview = async (params) => {
  const queryString = 'DELETE FROM reviews WHERE id = $1';

  let response;
  try {
    response = await pool.query(queryString, params);
  } catch (e) {
    console.error(e);
    throw (e);
  }
  return response;
};

module.exports = {
  getReviews,
  postReview,
  updateReview,
  deleteReview,
};
