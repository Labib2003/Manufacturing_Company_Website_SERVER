const express = require("express");
const {
  getAllTools,
  postNewTool,
  getToolById,
  updateTool,
  deleteTool,
} = require("../controllers/tool.controllers");
const verifyJWT = require("../middlewares/verifyJWT");
const verifyAdmin = require("../middlewares/verifyAdmin");

const router = express.Router();

router.route("/").get(getAllTools).post(verifyJWT, verifyAdmin, postNewTool);
router
  .route("/:id")
  .get(getToolById)
  .patch(verifyJWT, updateTool)
  .delete(verifyJWT, verifyAdmin, deleteTool);

module.exports = router;
