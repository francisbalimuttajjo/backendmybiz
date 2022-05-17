const { sendResponse } = require("../utils/fns");
const db = require("../models");
const { sequelize } = require("../models");

exports.addOne = async (req, res) => {
  console.log(req.body);
  try {
    const stockItem = await db.StockItem.create(req.body);
    sendResponse(req, res, 200, stockItem);
    console.log(stockItem);
  } catch (err) {
    console.log(err);
    sendResponse(req, res, 400, err.message, "fail");
  }
};

exports.updateOne = async (req, res) => {
  const id = req.params.id;

  try {
    await db.StockItem.update(req.body, { where: { id } });

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

exports.getAll = async (req, res) => {
  try {
    const stockItems = await db.StockItem.findAll({
      include: [
        {
          model: db.Sale,
          as: "salesProfile",
        },
      ],
    });
    sendResponse(req, res, 200, stockItems);
  } catch (err) {
    console.log(err);
    sendResponse(req, res, 400, err.message, "fail");
  }
};
