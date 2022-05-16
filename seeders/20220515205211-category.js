"use strict";
const { v4: uuidv4 } = require("uuid");
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "ProductCategories",
      [
        {
          title: "stationery",
          value: "stationery",
          user: "bafudde@gmail.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "bafra",
          value: "stationery",
          user: "bafra@gmail.com",
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
