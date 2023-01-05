const express = require("express");
const {
  getAllOrders,
  placeNewOrder,
  getOrdersByEmail,
  deleteOrder,
} = require("../controllers/order.controllers");
const verifyJWT = require("../middlewares/verifyJWT");

const router = express.Router();

router.route("/").get(verifyJWT, getAllOrders).post(verifyJWT, placeNewOrder);
router.route("/:email").get(getOrdersByEmail);
router.route("/:id").delete(verifyJWT, deleteOrder);

module.exports = router;
