const { sendResponse } = require("../utils/fns");
const db = require("../models");
const { sequelize } = require("../models");

exports.deleteOneUser = async (req, res) => {
  let transaction;

  transaction = await sequelize.transaction();
  const id = req.params.id;
  try {
    let user = await db.User.findOne({ where: { id } });

    if (!user) {
      return sendResponse(req, res, 404, "no user with provided id", "fail");
    }

    await db.ProductCategory.destroy(
      { where: { user: user.email } },
      { transaction }
    );

    await db.User.destroy({ where: { id } }, { transaction });

    await transaction.commit();

    sendResponse(req, res, 200, "deleted successfully");
  } catch (err) {
    console.log(err);
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
  try {
    const users = await db.User.findAll({
      include: [
        {
          model: db.ProductCategory,
          as: "productCategories",
        },

        // {
        //   model: db.Sale,
        //   as: "sales",
        // },
        // {
        //   model: db.Transaction,
        //   as: "transactions",
        // },
      ],
    });
    sendResponse(req, res, 200, users);
  } catch (err) {
    sendResponse(req, res, 400, err.message, "fail");
  }
};
