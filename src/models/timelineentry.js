'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TimelineEntry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TimelineEntry.init({
    caseId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    date: DataTypes.DATE,
    summary: DataTypes.STRING,
    description: DataTypes.TEXT,
    observations: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'TimelineEntry',
  });
  return TimelineEntry;
};