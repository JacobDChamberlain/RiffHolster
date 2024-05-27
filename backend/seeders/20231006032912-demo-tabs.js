'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Tabs', [
      {
        name: 'Electric Red',
        fileURL: '/testTabs/electric_red.gp5',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'In Death Is Death',
        fileURL: '/testTabs/in_death_is_death.gp5',
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Altitudes',
        fileURL: '/testTabs/altitudes.gp5',
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Whirling Fortress',
        fileURL: '/testTabs/whirlTHIS.gp5',
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tabs', null, {});
  }
};
