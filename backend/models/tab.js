'use strict';

const { DataTypes } = require('sequelize');

const TabModel = ( sequelize ) => {
  const Tab = sequelize.define( 'Tab', {
    name: DataTypes.STRING,
    fileURL: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    modelName: 'Tab'
  });

  Tab.associate = ( models ) => {
    Tab.belongsTo( models.User, {
      foreignKey: 'userId',
      targetKey: 'id'
    });
  };

  return Tab;
};

module.exports = TabModel;