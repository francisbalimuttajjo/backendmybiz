"use strict";
const { v4: uuidv4 } = require("uuid");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "StockItems",
      [
        {
          // id: uuidv4(),
          productCategory_id: 4,
          name: "books",
          buyingPrice: 3000,
          sellingPrice: 3500,
          buyingCurrency: "usd",
          sellingCurrency: "ugx",
          packaging: "dozen",
          category: "stationery",
          image: "image",
          description: "description",
          stock: 20,
          supplier: "b investments",
          isReturnable: false,

          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
    //  * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
