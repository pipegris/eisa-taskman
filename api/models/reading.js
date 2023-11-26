'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Reading extends Model {

    static associate(models) {
      // define association here
    }
  }
  Reading.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    temperature: {
      allowNull: true,
      type: DataTypes.FLOAT
    },
    moisture: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    level: {
      allowNull: true,
      type: DataTypes.DATE
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'reading',
    freezeTableName: true,
    updatedAt: false
  });
  return Reading;
};