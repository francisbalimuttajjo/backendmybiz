const { sendResponse } = require("../utils/fns");
const db = require("../models");
const { sequelize } = require("../models");

exports.deleteProductCategory = async (req, res) => {
  let transaction;

  transaction = await sequelize.transaction();
  const id = parseInt(req.params.id);

  try {
    let productCategory = await db.ProductCategory.findOne({
      where: { id },
    });

    if (!productCategory) {
      return sendResponse(
        req,
        res,
        404,
        "no product category with provided id",
        "fail"
      );
    }

    //getting all items that belong to that category && their salesList as salesProfile
    const items_list = await db.StockItem.findAll(
      {
        where: { productCategory_id: id },
        include: [{ model: db.Sale, as: "salesProfile" }],
      },
      { transaction }
    );

    const sales_list = items_list.map((el) => el.salesProfile);
    const sales_ids = sales_list.flat().map((el) => el.id);

    //removing those sales from table
    await db.Sale.destroy({ where: { id: sales_ids } }, { transaction });

    //deleting items fom the table
    db.StockItem.destroy(
      {
        where: { productCategory_id: id },
      },
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

exports.getProductCategories = async (req, res) => {
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

exports.updateProductCategory = async (req, res) => {
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
    sendResponse(req, res, 500, err.message, "fail");
  }
};
//
exports.addProductCategory = async (req, res) => {
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
