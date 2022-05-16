const { sendResponse } = require("../utils/fns");
const db = require("../models");
const { sequelize } = require("../models");

exports.getAll = async (req, res) => {
  try {
    const productCategories = await db.ProductCategory.findAll({
      include: [
        {
          model: db.StockItem,
          as: "stockItems",
        },
      ],
    });
    sendResponse(req, res, 200, productCategories);
  } catch (err) {
    console.log(err);
    sendResponse(req, res, 400, err.message, "fail");
  }
};
