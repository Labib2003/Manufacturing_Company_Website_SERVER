const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const {
  getAllOrdersService,
  placeNewOrderService,
  getOrdersByEmailService,
  deleteOrderService,
  getOrderByIdService,
  updatePaymentStatusService,
} = require("../services/order.services");

module.exports.getAllOrders = async (req, res) => {
  try {
    const response = await getAllOrdersService();

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
module.exports.getOrdersByEmail = async (req, res) => {
  try {
    const response = await getOrdersByEmailService(req.params.email);

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
module.exports.getOrderById = async (req, res) => {
  try {
    const response = await getOrderByIdService(req.params.id);

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
module.exports.placeNewOrder = async (req, res) => {
  try {
    const response = await placeNewOrderService(req.body);

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
module.exports.updatePaymentStatus = async (req, res) => {
  try {
    const response = await updatePaymentStatusService(req.params.id, {
      ...req.body,
      paid: true,
    });
    console.log(response);

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
module.exports.deleteOrder = async (req, res) => {
  try {
    const response = await deleteOrderService(req.params.id);

    if (!response.deletedCount) {
      res.status(500).json({
        success: false,
        message: "Order with this id does not exist",
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
module.exports.createPaymentIntent = async (req, res) => {
  try {
    const { price } = req.body;
    const amount = price * 100;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
