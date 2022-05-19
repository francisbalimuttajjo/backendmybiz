const { sendResponse } = require("../utils/fns");
const db = require("../models");
const handler = require("./handler");


exports.deleteSale = handler.deleteOne(db.Sale);

//reversing / cancelling single sale
exports.reverseSale = async (req, res) => {
  try {
    //getting the sale
    const sale = await db.Sale.findOne({
      where: { id: req.params.id },
    });
    //updating stock  before deleting
    await db.StockItem.update(
      { stock: db.sequelize.literal(`stock + ${sale.quantity}`) },
      { where: { id: sale.item_id } }
    );
    //deleting sale from table
    await db.Sale.destroy({
      where: { id: req.params.id },
    });
    sendResponse(req, res, 200, "operation successfull");
  } catch (err) {
    sendResponse(req, res, 400, err.message, "fail");
  }
};

exports.addSale = async (req, res) => {
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

exports.getSales = async (req, res) => {
  try {
    const sales = await db.Sale.findAll({
      where: { user: req.body.user },
      include: [
        {
          model: db.StockItem,
          as: "item",
        },
      ],
    });

    sendResponse(req, res, 200, sales);
  } catch (err) {
    sendResponse(req, res, 400, err.message, "fail");
  }
};
