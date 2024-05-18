'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');

const UserModel = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
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
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: async ( user ) => {
        user.hashedPassword = await bcrypt.hash( user.hashedPassword, 10 );
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.associate = function( models ) {
    User.hasMany( models.Tab, {
      foreignKey: 'userId',
      as: 'tabs'
    });
  };

  User.prototype.validatePassword = async function( password ) {
    return await bcrypt.compare( password, this.hashedPassword );
  };

  return User;
};


module.exports = UserModel;