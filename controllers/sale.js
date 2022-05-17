const { sendResponse } = require("../utils/fns");
const db = require("../models");
const { sequelize } = require("../models");

exports.addOne = async (req, res) => {
  const { user, item_id, transaction_id, client, quantity, price } = req.body;
  try {
    const new_sale = await db.Sale.create({
      user,
      item_id,
      transaction_id,
      client,
      quantity,
      price,
    });
    sendResponse(req, res, 201, new_sale);
  } catch (err) {
    sendResponse(req, res, 400, err.message, "fail");
  }
};

exports.getAll = async (req, res) => {
  try {
    const sales = await db.Sale.findAll({
      include: [
        {
          model: db.StockItem,
          as: "item",
        },
      ],
    });
    sendResponse(req, res, 200, sales);
  } catch (err) {
    console.log(err);
    sendResponse(req, res, 400, err.message, "fail");
  }
};
