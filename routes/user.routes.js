const express = require("express");
const {
  upsertUser,
  getUserByEmail,
  updateUser,
  getAllUsers,
  makeUserAdmin,
} = require("../controllers/user.controllers");
const verifyAdmin = require("../middlewares/verifyAdmin");
const verifyJWT = require("../middlewares/verifyJWT");

const router = express.Router();

router.route("/").get(verifyJWT, verifyAdmin, getAllUsers);
router.route("/admin/:email").patch(verifyJWT, verifyAdmin, makeUserAdmin);
router
  .route("/:email")
  .get(getUserByEmail)
  .put(upsertUser)
  .patch(verifyJWT, updateUser);

module.exports = router;
