"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Sale extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.Transaction, {
        foreignKey: "transaction_id",
        as: "salesLIst",
      });
      this.belongsTo(models.StockItem, {
        foreignKey: "item_id",
        as:'item'
      });
      this.belongsTo(models.User, {
        foreignKey: "user",
        as: "sales",
        sourceKey: "email",
      });
    }

 
  }
  Sale.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      user: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: { args: true, msg: "Please provide a valid email" },
          notEmpty: { args: true, msg: "user must be included" },
        },
      },
      item_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: "item must be included" },
        },
      },
      transaction_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: "sale must belong to a transaction " },
        },
      },
      client: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: "Sale must belong to a client" },
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: "qty must be included" },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: "price must be included" },
        },
      },
    },
    {
      sequelize,
      modelName: "Sale",
    }
  );
  return Sale;
};
