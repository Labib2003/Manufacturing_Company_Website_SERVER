const mongoose = require("mongoose");
const validator = require("validator");

const orderSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide your email"],
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    phone: {
      type: String,
      required: [true, "Please provide your phone number"],
    },
    address: {
      type: String,
      required: [true, "Please provide your address"],
    },
    product_name: {
      type: String,
      required: [true, "Please provide the product name"],
    },
    quantity: {
      type: Number,
      required: [true, "Please provide the order quantity"],
      min: [0, "Quantity cannot be zero"],
    },
    per_unit_price: {
      type: Number,
      required: [true, "Please provide the order quantity"],
    },
    paid: {
      type: Boolean,
      default: false,
    },
    transactionId: {
      type: String,
      default: "",
    },
    shipped: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: "orders",
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
