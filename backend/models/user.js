'use strict';

const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany( models.Tab, {
        foreignKey: 'userId',
        as: 'tabs'
      });
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        max: 20,
        notNull: {
          msg: 'Username is required'
        },
        notEmpty: {
          msg: 'Username cannot be blank'
        },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1, 50],
          msg: 'Username cannot be more than 50 characters'
        },
        notNull: {
          msg: 'Email is required'
        },
        notEmpty: {
          msg: 'Email cannot be blank'
        },
        isEmail: {
          msg: 'Invalid email quit playing'
        }
      }
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password is required'
        },
        notEmpty: {
          msg: 'Password cannot be blank'
        },
        // validatePassword() {
        //   if (!this.password) {
        //     throw new Error('Password cannot be blank');
        //   }
        // }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
