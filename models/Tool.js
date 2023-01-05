const mongoose = require("mongoose");
const validator = require("validator");

const toolSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for the product."],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Please provide an image of the product."],
      validate: [validator.isURL, "Please provide a valid URL."],
    },
    description: {
      type: String,
      required: [true, "Please provide a description for the product."],
    },
    min_order_quantity: {
      type: Number,
      required: [
        true,
        "Please provide a minimum order quantity for the product.",
      ],
      min: 0,
    },
    available_quantity: {
      type: Number,
      required: [
        true,
        "Please provide the available quantity for the product.",
      ],
      min: 0,
    },
    per_unit_price: {
      type: Number,
      required: [true, "Please provide the price of each unit of the product."],
      min: 0,
    },
  },
  {
    collection: "tools",
  }
);

const Tool = mongoose.model("Tool", toolSchema);

module.exports = Tool;
