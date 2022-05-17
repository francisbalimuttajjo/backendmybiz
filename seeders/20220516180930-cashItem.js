"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "CashItems",
      [
        {
          Category: "labour",
          Amount: 8900,
          entryDate: new Date(),
          itemTime: new Date(),
          Remark: "goods",
          user: "bafudde@gmail.com",
          type: "sales",
          paymentMode: "online",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      
        // {
        //   title: "bafra",
        //   value: "stationery",
        //   user: "bafra@gmail.com",
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
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
