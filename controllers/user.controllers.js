const {
  upsertUserService,
  getUserByEmailService,
  updateUserService,
  getAllUsersService,
  makeUserAdminService,
} = require("../services/user.services");
const jsonwebtoken = require("jsonwebtoken");
const dotenv = require("dotenv").config();

module.exports.getAllUsers = async (req, res) => {
  try {
    const response = await getAllUsersService();

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
module.exports.getUserByEmail = async (req, res) => {
  try {
    const response = await getUserByEmailService(req.params.email);

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
module.exports.upsertUser = async (req, res) => {
  try {
    const response = await upsertUserService(req.params.email, req.body);
    const token = jsonwebtoken.sign(
      { email: req.params.email },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.status(200).json({
      success: true,
      data: response,
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports.updateUser = async (req, res) => {
  try {
    const response = await updateUserService(req.params.email, req.body);

    if (!response.matchedCount) {
      res.status(500).json({
        success: false,
        message: "No user found with this email",
      });
    }
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
module.exports.makeUserAdmin = async (req, res) => {
  console.log(req.params.email);
  try {
    const response = await makeUserAdminService(req.params.email);

    if (!response.matchedCount) {
      res.status(500).json({
        success: false,
        message: "No user found with this email",
      });
    }
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
