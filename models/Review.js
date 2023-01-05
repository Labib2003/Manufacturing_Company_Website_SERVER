const mongoose = require("mongoose");
const validator = require("validator");

const reviewSchema = mongoose.Schema(
  {
    user: {
      type: String,
      required: [true, "Please provide your name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      validate: [validator.isEmail, "Please provide a valid email address"],
    },
    stars: {
      type: Number,
      required: [true, "Please give a rating on the scale of 0 to 5 stars"],
    },
    body: {
      type: String,
      required: [true, "Please provide a body for your review"],
    },
  },
  {
    collection: "reviews",
  }
);

const Review = mongoose.model("review", reviewSchema);

module.exports = Review;
