const Review = require("../models/Review");

module.exports.getAllReviewsService = () => Review.find({});
module.exports.postNewReviewService = (data) => new Review(data).save();
