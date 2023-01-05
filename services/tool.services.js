const Tool = require("../models/Tool");

module.exports.getAllToolsService = () => Tool.find({});
module.exports.getToolByIdService = (id) => Tool.findOne({ _id: id });
module.exports.postNewToolService = (data) => new Tool(data).save();
module.exports.updateToolService = (id, data) =>
  Tool.updateOne({ _id: id }, { $set: data });
module.exports.deleteToolService = (id) => Tool.deleteOne({ _id: id });
