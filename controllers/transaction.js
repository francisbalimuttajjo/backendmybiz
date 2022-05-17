const { sendResponse } = require("../utils/fns");
const db = require("../models");
const { sequelize } = require("../models");

exports.addOne = async (req, res) => {
  let t;

  t = await sequelize.transaction();
  try {
    const {
      user,
      client,
      type,
      paymentDate,
      discount,
      cashReceived,
      cashPending,
      stockItems,
    } = req.body;

    const transaction = await db.Transaction.create(
      { user, client, type, paymentDate, discount, cashReceived, cashPending },
      { t }
    );

    const new_items_with_transaction_id = stockItems.map(function (el) {
      return { ...el, transaction_id: transaction.id, client };
    });

    //creating sales in bulk
    await db.Sale.bulkCreate(new_items_with_transaction_id, { t });

    //reduce stock in database
    await stockItems.map((item) => {
      db.StockItem.update(
        { stock: db.sequelize.literal(`stock - ${item.quantity}`) },
        { where: { id: item.item_id } },
        { t }
      );
    });
    //comiiting transaction if all is well
    await t.commit();

    sendResponse(req, res, 201, transaction);
  } catch (err) {
    //reversing all if there is an error
    if (t) {
      await t.rollback();
    }
    sendResponse(req, res, 400, err.message, "fail");
  }
};

exports.getAll = async (req, res) => {
  try {
    const transactions = await db.Transaction.findAll({
      where: { user: req.body.user },
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
