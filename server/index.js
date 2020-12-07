require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const { getReviews, postReview, updateReview, deleteReview } = require('./db/models.js');

const app = express();

// Serve static index.html file
app.use(express.static('client/dist'));

// Middleware
app.use(express.json());
app.use(morgan('tiny'));

// Get all reviews for product ID
app.get('/api/reviews/:id', async (req, res) => {
  console.log('request was made here-------');

  let response;
  try {
    response = await getReviews(req.params.id);
  } catch (e) {
    res.status(404).send(e);
  }
  res.status(200).send(response.rows);
});

// POSTs a review into the next available ID.
app.post('/api/reviews/', async (req, res) => {
  // Client-side, expect a valid user OR anonymous.
  // Expects from req.body these things:
  const {
    productId, user_name, overall_rating, review_date,
    headline, full_text, helpful, verified_purchase, product_photo,
  } = req.body;

  const params = [
    productId, product_photo, user_name, overall_rating,
    review_date, headline, full_text, helpful, verified_purchase,
  ];

  let response;
  try {
    response = await postReview(params);
  } catch (e) {
    res.status(500).send(e);
  }
  res.status(200).send(response);
});

// Permit editing a review, probably only the guest's reviews for now?
app.put('/api/reviews/', async (req, res) => {
  // Possible changes include: overall_rating, headline, full_text
  const { overall_rating, headline, full_text, id } = req.body;
  const params = [overall_rating, headline, full_text, id];

  let response;
  try {
    response = await updateReview(params);
  } catch (e) {
    res.status(500).send(e);
  }
  res.status(200).send(response);
});

app.delete('/api/reviews/:id', async (req, res) => {
  // Deletes a review. Do we have access to the review ID? We should.
  let response;
  try {
    response = await deleteReview([req.params.id]);
  } catch (e) {
    res.status(500).send(e);
  }
  res.status(200).send(response);
});

const port = process.env.PORT || 3004;
app.listen(port, () => { console.log(`The server is listening on port ${port}...`); });
