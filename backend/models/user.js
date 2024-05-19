'use strict';

const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const UserModel = ( sequelize ) => {
  const User = sequelize.define('User',{
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [0, 20],
          msg: 'Username must be 20 characters or less'
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
          msg: 'Email must be 50 characters or less'
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

  User.beforeCreate( async ( user, options ) => {
    const hashedPassword = await bcrypt.hash( user.hashedPassword, 10 );
    user.hashedPassword = hashedPassword;
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