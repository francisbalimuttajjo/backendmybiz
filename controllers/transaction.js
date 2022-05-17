const { sendResponse } = require("../utils/fns");
const db = require("../models");
const { sequelize } = require("../models");

exports.getAll = async (req, res) => {
  try {
    const transactions = await db.Transaction.findAll({
      include: [
        {
          model: db.Sale,
          as: "salesList",
        },
      ],
    });
    sendResponse(req, res, 200, transactions);
  } catch (err) {
    console.log(err);
    sendResponse(req, res, 400, err.message, "fail");
  }
};
