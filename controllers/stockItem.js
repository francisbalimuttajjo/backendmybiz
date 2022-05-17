const { sendResponse } = require("../utils/fns");
const db = require("../models");
const { sequelize } = require("../models");

exports.deleteOne = async (req, res) => {
  let transaction;

  transaction = await sequelize.transaction();
  const id = parseInt(req.params.id);

  try {
    let stockItem = await db.StockItem.findOne({ where: { id } });

    if (!stockItem) {
      return sendResponse(
        req,
        res,
        404,
        "no stockItem with provided id",
        "fail"
      );
    }

    await db.Sale.destroy({ where: { item_id: id } }, { transaction });

    await db.StockItem.destroy({ where: { id } }, { transaction });

    await transaction.commit();

    sendResponse(req, res, 200, "deleted successfully");
  } catch (err) {
    if (transaction) {
      await transaction.rollback();
    }
    sendResponse(
      req,
      res,
      500,
      err.message,

      "fail"
    );
  }
};

exports.addOne = async (req, res) => {
  try {
    const stockItem = await db.StockItem.create(req.body);
    sendResponse(req, res, 200, stockItem);
  } catch (err) {
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
