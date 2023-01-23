const {
  getAllToolsService,
  postNewToolService,
  getToolByIdService,
  updateToolService,
  deleteToolService,
} = require("../services/tool.services");

module.exports.getAllTools = async (req, res) => {
  try {
    const response = await getAllToolsService();

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
module.exports.getToolById = async (req, res) => {
  try {
    const response = await getToolByIdService(req.params.id);

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
module.exports.postNewTool = async (req, res) => {
  try {
    const response = await postNewToolService(req.body);

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
module.exports.updateTool = async (req, res) => {
  try {
    console.log(req.params.id, req.body);
    const response = await updateToolService(req.params.id, req.body);
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
module.exports.deleteTool = async (req, res) => {
  try {
    const response = await deleteToolService(req.params.id, req.body);

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
