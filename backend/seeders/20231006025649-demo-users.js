'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Users', [
      {
        username: 'Demo',
        email: 'demo@demo.com',
        hashedPassword: await bcrypt.hash( 'password', 10 ),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'Demo2',
        email: 'demo2@demo.com',
        hashedPassword: await bcrypt.hash( 'password', 10 ),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
