const { sendResponse } = require("../utils/fns");



exports.deleteOne = (Model) => async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await Model.destroy({ where: { id } });
    if (!doc) {
      return sendResponse(req, res, 404, "operation unsuccessfull", "fail");
    }
    sendResponse(req, res, 200, "deleted successfully");
  } catch (err) {
    sendResponse(
      req,
      res,
      500,
      `Error deleting document with id  ${id}`,
      "fail"
    );
  }
};