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
          msg: 'Username must be between 1 and 20 characters'
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
          msg: 'Email must be between 1 and 50 characters'
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
    password: {
      type: DataTypes.VIRTUAL,
      allowNull: false,
      validate: {
        len: {
          args: [1,50],
          msg: 'Password must be between 1 and 50 characters'
        },
        notNull: {
          msg: 'Password must not be null'
        },
        notEmpty: {
          msg: 'Password must not be blank'
        }
      }
    },
    hashedPassword: {
      type: DataTypes.STRING,
    }
  }, {
    hooks: {
      beforeCreate: async ( user ) => {
        user.hashedPassword = await bcrypt.hash( user.password, 10 );
      }
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