const {
  getAllOrdersService,
  placeNewOrderService,
  getOrdersByEmailService,
  deleteOrderService,
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
