'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Case extends Model {
    static associate(models) {
      Case.belongsTo(models.Client, { foreignKey: 'clientId', as: 'client' });
      Case.belongsTo(models.CaseType, { foreignKey: 'typeId', as: 'caseType' });
      Case.belongsTo(models.Status, { foreignKey: 'statusId', as: 'status' });
      Case.hasMany(models.TimelineEntry, { foreignKey: 'caseId', as: 'timelineEntries' });
    }
  }
  Case.init({
    clientId: DataTypes.INTEGER,
    caseNumber: DataTypes.STRING,
    typeId: DataTypes.INTEGER,
    statusId: DataTypes.INTEGER,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Case',
  });
  return Case;
};
