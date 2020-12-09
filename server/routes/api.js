const router = require('express').Router();
const { getReviews, postReview, updateReview, deleteReview } = require('../db/models.js');

router.get('/reviews/:id', async (req, res) => {
  let response;
  try {
    response = await getReviews(req.params.id);
  } catch (e) {
    return res.status(404).send(e);
  }
  return res.status(200).send(response.rows);
});

router.post('/reviews/', async (req, res) => {
  // Client-side, expect a valid user OR anonymous.
  // Expects from req.body these things:
  const {
    product_id, user_name, overall_rating, review_date,
    headline, full_text, helpful, verified_purchase, product_photo,
  } = req.body;

  const params = [
    product_id, product_photo, user_name, overall_rating,
    review_date, headline, full_text, helpful, verified_purchase,
  ];

  let response;
  try {
    response = await postReview(params);
  } catch (e) {
    return res.status(500).send(e);
  }
  return res.status(200).send(response);
});

router.put('/reviews/', async (req, res) => {
  // Possible changes include: overall_rating, headline, full_text
  const { overall_rating, headline, full_text, id, product_id } = req.body;
  const params = [overall_rating, headline, full_text, id, product_id];

  let response;
  try {
    response = await updateReview(params);
  } catch (e) {
    return res.status(500).send(e);
  }
  return res.status(200).send(response);
});

router.delete('/reviews/:id', async (req, res) => {
  // Deletes a review. Do we have access to the review ID? We should.
  let response;
  try {
    response = await deleteReview([req.params.id]);
  } catch (e) {
    return res.status(500).send(e);
  }
  return res.status(200).send(response);
});

module.exports = router;
