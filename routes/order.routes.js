const express = require("express");
const {
  getAllOrders,
  placeNewOrder,
  getOrdersByEmail,
  deleteOrder,
  getOrderById,
  createPaymentIntent,
  updatePaymentStatus,
} = require("../controllers/order.controllers");
const verifyJWT = require("../middlewares/verifyJWT");

const router = express.Router();

router.route("/").get(verifyJWT, getAllOrders).post(verifyJWT, placeNewOrder);
router.route("/create-payment-intent").post(verifyJWT, createPaymentIntent);
router.route("/byEmail/:email").get(verifyJWT, getOrdersByEmail);
router.route("/:id").get(getOrderById).patch(verifyJWT, updatePaymentStatus).delete(verifyJWT, deleteOrder);

module.exports = router;
