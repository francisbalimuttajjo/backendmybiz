"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: "user",
        as: "transactions",
        sourceKey: "email",
      });

      this.hasMany(models.Sale, {
        foreignKey: "transaction_id",
        as: "salesList",
      });
    }
    toJSON() {
      return {
        ...this.get(),
        // id: undefined,
        updatedAt: undefined,
      };
    }
  }
  Transaction.init(
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
      client: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: "client is a required field" },
        },
      },

      type: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },

      paymentDate: DataTypes.DATE,

      discount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: "Please add cash discount" },
        },
      },
      cashReceived: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: "Please add cash received" },
        },
      },
      cashPending: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: "Please add cash pending" },
        },
      },
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
