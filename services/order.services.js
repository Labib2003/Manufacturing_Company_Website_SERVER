const Order = require("../models/Order");

module.exports.getAllOrdersService = () => Order.find({});
module.exports.getOrdersByEmailService = (email) =>
  Order.find({ email: email });
module.exports.getOrderByIdService = (id) => Order.findOne({ _id: id });
module.exports.placeNewOrderService = (data) => new Order(data).save();
module.exports.updatePaymentStatusService = (id, data) =>
  Order.findByIdAndUpdate(id, data);
module.exports.deleteOrderService = (id) => Order.deleteOne({ _id: id });
