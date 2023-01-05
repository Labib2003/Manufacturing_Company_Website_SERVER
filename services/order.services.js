const Order = require("../models/Order");

module.exports.getAllOrdersService = () => Order.find({});
module.exports.getOrdersByEmailService = (email) =>
  Order.find({ email: email });
module.exports.placeNewOrderService = (data) => new Order(data).save();
module.exports.deleteOrderService = (id) => Order.deleteOne({ _id: id });
