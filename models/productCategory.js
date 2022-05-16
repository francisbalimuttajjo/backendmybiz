"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductCategory extends Model {
    static associate(models) {
      
      // define association here
      this.belongsTo(models.User, {
        foreignKey: "user",
        as: "productCategories",
        sourceKey: "email",
      });
      this.hasMany(models.StockItem, {
        foreignKey: "productCategory_id",
        as: "stockItems",
        
      });
    }
  }
  ProductCategory.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      value: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      user: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { args: true, msg: "Category must belong to a user" },
          isEmail: { args: true, msg: "Please provide a valid email" },
        },
      },
    },
    {
      sequelize,
      modelName: "ProductCategory",
    }
  );
  return ProductCategory;
};
