const {
  getAllReviewsService,
  postNewReviewService,
} = require("../services/review.services");

module.exports.getAllReviews = async (req, res) => {
  try {
    const response = await getAllReviewsService();

    res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports.postNewReview = async (req, res) => {
  try {
    const response = await postNewReviewService(req.body);

    res.status(200).json({
      success: true,
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
