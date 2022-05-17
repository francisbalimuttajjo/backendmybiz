const { sendResponse } = require("../utils/fns");
const db = require("../models");
const { sequelize } = require("../models");

exports.getAll = async (req, res) => {
  try {
    const sales = await db.Sale.findAll({
      include: [
        {
          model: db.StockItem,
          as: "salesProfile",
        },
      ],
    });
    sendResponse(req, res, 200, sales);
  } catch (err) {
    console.log(err);
    sendResponse(req, res, 400, err.message, "fail");
  }
};
