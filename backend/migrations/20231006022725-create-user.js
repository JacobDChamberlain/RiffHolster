'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
        validate: {
          len: [ 6, 20 ]
        }
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      hashedPassword: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          min: 8
        }
      },
      // guitarTabs: {
      //   type: Sequelize.ARRAY(Sequelize.INTEGER),
      //   references: {
      //     model: 'Tab',
      //     key: 'id'
      //   },
      //   allowNull: true
      // },
      // guitarTabs: {
      //   type: Sequelize.ARRAY(Sequelize.INTEGER),
      //   allowNull: true
      // },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};