"use strict";

const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          id: uuidv4(),
          firstName: "John Doe",
          lastName: "mayanja",
          email: "bafudde@gmail.com",
          password: "francis",
          photo: "bafra.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          firstName: "John Doe",
          lastName: "mayanja",
          email: "bafra@gmail.com",
          password: "francis",
          photo: "bafra.jpg",
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
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
