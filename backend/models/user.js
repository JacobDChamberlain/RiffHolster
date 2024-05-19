'use strict';

const { DataTypes } = require('sequelize');

const UserModel = ( sequelize ) => {
  const User = sequelize.define('User',{
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [0, 20],
          msg: 'Username can be up to 20 characters'
        },
        notNull: {
          msg: 'Username is required'
        },
        notEmpty: {
          msg: 'Username must not be blank'
        },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [1,50],
          msg: 'Email can be up to 50 characters'
        },
        notNull: {
          msg: 'Email is required'
        },
        notEmpty: {
          msg: 'Email must not be blank'
        },
        isEmail: {
          msg: 'Invalid email format'
        }
      }
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    modelName: 'User',
  });

  User.associate = ( models ) => {
    User.hasMany( models.Tab, {
      foreignKey: 'userId',
      as: 'tabs'
    });
  };

  return User;
};


module.exports = UserModel;