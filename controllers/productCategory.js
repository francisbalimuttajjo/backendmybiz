const { sendResponse } = require("../utils/fns");
const db = require("../models");
const { sequelize } = require("../models");

exports.deleteOne = async (req, res) => {
  let transaction;

  transaction = await sequelize.transaction();
  const id = parseInt(req.params.id);

  try {
    let productCategory = await db.ProductCategory.findOne({ where: { id } });

    if (!productCategory) {
      return sendResponse(
        req,
        res,
        404,
        "no product category with provided id",
        "fail"
      );
    }

    await db.StockItem.destroy(
      { where: { productCategory_id: id } },
      { transaction }
    );

    await db.ProductCategory.destroy({ where: { id } }, { transaction });

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

exports.getAll = async (req, res) => {
  const { user } = req.body;

  try {
    const availableCategories = await db.ProductCategory.findAll({
      where: { user },
      include: [{ model: db.StockItem, as: "stockItems" }],
    });

    return sendResponse(req, res, 200, availableCategories);
  } catch (err) {
    sendResponse(req, res, 400, err.message, "fail");
  }
};

exports.updateOne = async (req, res) => {
  const id = req.params.id;

  const { user, title } = req.body;

  try {
    const availableCategory = await db.ProductCategory.findAll({
      where: { user, title },
    });

    if (availableCategory.length) {
      return sendResponse(
        req,
        res,
        400,
        title + " " + " already exists",
        "fail"
      );
    }
    await db.ProductCategory.update({ title, value: title }, { where: { id } });

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
//
exports.addOne = async (req, res) => {
  const { user, title } = req.body;
  try {
    const availableCategory = await db.ProductCategory.findAll({
      where: { user, title },
    });
    if (availableCategory.length)
      return sendResponse(
        req,
        res,
        400,
        title + " " + " already exists",
        "fail"
      );

    const new_category = await db.ProductCategory.create({
      user,
      title,
      value: title,
    });

    return sendResponse(req, res, 201, new_category);
  } catch (err) {
    sendResponse(req, res, 400, err.message, "fail");
  }
};
