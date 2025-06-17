'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories',[
      { name: 'Plumbing', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Electrical', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Cleaning', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Gardening', createdAt: new Date(), updatedAt: new Date() },
    ])
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
