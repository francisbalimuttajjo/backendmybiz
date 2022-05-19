
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CashItem extends Model {
    static associate(models) {
      this.belongsTo(models.Transaction, {
        foreignKey: "user",
        as: "cashItems",
        sourceKey:"email"
      });
    }
    toJSON() {
      return {
        ...this.get(),
        updatedAt: undefined,
        createdAt: undefined,
      };
    }
  }
  CashItem.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      Category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: "item must have a category" },
        },
      },
      Amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: "item must have amount" },
        },
      },
      entryDate: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: "item must have entry date " },
        },
      },
      itemTime: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: "item must have entry time" },
        },
      },
      Remark: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: "item must have a remark" },
        },
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: "item must have a type" },
        },
      },
      user: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: "item must belong to a user" },
          isEmail: { args: true, msg: "Please provide a valid email" },
        },
      },
      paymentMode: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: "payment mode is required" },
        },
      },
    },
    {
      sequelize,
      modelName: "CashItem",
    }
  );
  return CashItem;
};
