"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class StockItem extends Model {
    static associate(models) {
      this.belongsTo(models.ProductCategory, {
        foreignKey: "productCategory_id",
        as: "stockItems",
      });
    }
  }
  StockItem.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      productCategory_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: "item must belong to a category" },
        },
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      buyingPrice: { type: DataTypes.INTEGER, allowNull: false },
      sellingPrice: { type: DataTypes.INTEGER },
      buyingCurrency: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "ugx",
      },
      packaging: { type: DataTypes.STRING, allowNull: false },
      category: { type: DataTypes.STRING, allowNull: false },
      image: { type: DataTypes.STRING },
      description: { type: DataTypes.STRING, allowNull: false },
      sellingCurrency: { type: DataTypes.STRING, defaultValue: "ugx" },
      stock: { type: DataTypes.INTEGER, allowNull: false },
      supplier: { type: DataTypes.STRING },
      isReturnable: { type: DataTypes.BOOLEAN },
    },
    {
      sequelize,
      modelName: "StockItem",
    }
  );
  return StockItem;
};
