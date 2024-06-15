'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TimelineEntry extends Model {
    static associate(models) {
      TimelineEntry.belongsTo(models.Case, { foreignKey: 'caseId', as: 'case' });
      TimelineEntry.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
      TimelineEntry.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' });
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
