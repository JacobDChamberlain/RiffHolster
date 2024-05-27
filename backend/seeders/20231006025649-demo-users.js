'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Users', [
      {
        username: 'User1',
        email: 'user1@test.com',
        hashedPassword: await bcrypt.hash( 'password', 10 ),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'User2',
        email: 'user2@test.com',
        hashedPassword: await bcrypt.hash( 'password', 10 ),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'User3',
        email: 'user3@test.com',
        hashedPassword: await bcrypt.hash( 'password', 10 ),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'User4',
        email: 'user4@test.com',
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
