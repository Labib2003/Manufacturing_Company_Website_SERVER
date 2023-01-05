const express = require("express");
const {
  getAllReviews,
  postNewReview,
} = require("../controllers/review.controllers");
const verifyJWT = require("../middlewares/verifyJWT");

const router = express.Router();

router.route("/").get(getAllReviews).post(verifyJWT, postNewReview);

module.exports = router;
