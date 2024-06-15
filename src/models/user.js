'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsTo(models.Role, { foreignKey: 'roleId', as: 'role' });
      User.belongsTo(models.Organization, { foreignKey: 'organizationId', as: 'organization' });
      User.hasMany(models.TimelineEntry, { foreignKey: 'userId', as: 'timelineEntries' });
    }
  }
  User.init({
    roleId: DataTypes.INTEGER,
    organizationId: DataTypes.INTEGER,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    emergencyPhone: DataTypes.STRING,
    address: DataTypes.TEXT,
    licenseNumber: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
