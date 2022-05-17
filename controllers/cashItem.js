const { sendResponse } = require("../utils/fns");
const db = require("../models");

const handler = require("./handler");

exports.deleteOne = handler.deleteOne(db.CashItem);
// adding one item
exports.addOneItem = async (req, res) => {
  const {
    Amount,
    Category,
    entryDate,
    itemTime,
    Remark,
    type,
    user,
    paymentMode,
  } = req.body;
  try {
   
    const item = await db.CashItem.create({
      Amount,
      Category,
      entryDate,
      itemTime,
      Remark,
      type,
      user,
      paymentMode,
    });
    sendResponse(req, res, 201, item);
  } catch (err) {
    sendResponse(req, res, 400, err.message, "fail");
  }
};

exports.getAll = async (req, res) => {
  try {
    const cashItems = await db.CashItem.findAll({
      where: { user: req.body.user },
    });

    sendResponse(req, res, 200, cashItems);
  } catch (err) {
    sendResponse(req, res, 400, err.message, "fail");
  }
};

exports.updateOne = async (req, res) => {
  const id = req.params.id;
  try {
    await db.CashItem.update(req.body, { where: { id } });

    sendResponse(req, res, 200, "update successfull");
  } catch (err) {
    sendResponse(
      req,
      res,
      500,
      `error occured while updating doc with id ${id}`,
      "fail"
    );
  }
};
