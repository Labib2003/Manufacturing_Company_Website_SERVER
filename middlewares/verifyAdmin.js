const User = require("../models/User");

const verifyAdmin = async (req, res, next) => {
  const requester = req.decoded.email;

  // checking if the requester is an admin or not
  const requesterAccount = await User.findOne({ email: requester });
  
  if (requesterAccount?.isAdmin) {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: "Item was not added. Forbidden access",
    });
  }
};

module.exports = verifyAdmin;
