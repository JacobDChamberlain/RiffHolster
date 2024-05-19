'use strict';

const { DataTypes } = require('sequelize');

const UserModel = ( sequelize ) => {
  const User = sequelize.define('User',{
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        max: 20,
        notNull: true,
        notEmpty: true,
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        max: 50,
        notNull: true,
        notEmpty: true
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