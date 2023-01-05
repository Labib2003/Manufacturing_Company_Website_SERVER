const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: [true, "Please provide users email address"],
      validate: [validator.isEmail, "Please provide a valid email address"],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: "users",
    versionKey: false,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
