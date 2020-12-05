const express = require('express');
const morgan = require('morgan');
const db = require('./db');

const app = express();

// Serve static index.html file
app.use(express.static('client/dist'));

// Middleware
app.use(express.json());
app.use(morgan('tiny'));

// Get all reviews for product ID
app.get('/api/reviews/:id', (req, res) => {
  console.log('request was made here-------');

  const queryString = `
  SELECT r.product_id, r.user_id,
  r.overall_rating, r.review_date,
  r.headline, r.full_text, r.helpful, r.verified_purchase, r.product_photo,
  u.user_name, u.country, u.avatar
  FROM reviews AS r
  INNER JOIN users AS u
  ON r.user_id=u.id
  WHERE r.product_id=?;`;

  db.query(queryString, [req.params.id], (err, results) => {
    if (err) {
      res.status(404).send('There was an error in accessing the database');
    } else {
      res.status(200).json(results);
    }
  });
});

// POSTs a review into the next available ID.
app.post('/api/reviews/', (req, res) => {
  // Expects from req.body these things.
  const {
    productId, user_name, overall_rating, review_date,
    headline, full_text, helpful, verified_purchase, product_photo,
  } = req.body;

  const params = [
    productId, product_photo, user_name, overall_rating,
    review_date, headline, full_text, helpful, verified_purchase,
  ];
  const queryString = `
  INSERT INTO reviews(product_id, product_photo, user_id, overall_rating, review_date, headline, full_text, helpful, verified_purchase)
  VALUES (?, ?, (SELECT id FROM users WHERE username = ? limit 1), ?, ?, ?, ?, ?, ?);
  `;

  db.query(queryString, params, (err, results) => {
    // If there's a posting error, it should return a 500, right?
    if (err) { return res.sendStatus(500); }
    return res.status(200).send(results);
  });
});

// Permit editing a review, probably only the guest's reviews for now?
app.put('/api/reviews/', (req, res) => {
  // Possible changes include: overall_rating, headline, full_text
  const {
    overall_rating, headline, full_text, id,
  } = req.body;
  const params = [overall_rating, headline, full_text, id];

  const queryString = 'UPDATE reviews SET overall_rating = ?, headline = ?, full_text = ? WHERE id = ?';
  db.query(queryString, params, (err, results) => {
    if (err) { return res.sendStatus(500); }
    return res.status(200).send(results);
  });
});

app.delete('/api/reviews/:id', (req, res) => {
  // Deletes a review. Do we have access to the review ID? We should.
  const id = req.url.substring(13);
  const queryString = 'DELETE FROM reviews WHERE id = ?';

  db.query(queryString, [id], (err, results) => {
    if (err) { return res.sendStatus(500); }
    return res.status(200).send(results);
  });
});

const port = process.env.PORT || 3004;
app.listen(port, () => {
  console.log(`The server is listening on port ${port}...`);
});
