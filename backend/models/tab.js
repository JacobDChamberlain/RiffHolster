'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tab extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Tab.belongsTo( models.User, {
        foreignKey: 'userId',
        targetKey: 'id'
      });
    }
  }
  Tab.init({
    name: DataTypes.STRING,
    fileURL: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tab',
  });
  return Tab;
};