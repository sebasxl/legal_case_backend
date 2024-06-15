'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {
    static associate(models) {
      // Definir asociación aquí
      Organization.hasMany(models.User, { foreignKey: 'organizationId', as: 'users' });
    }
  }
  Organization.init({
    name: DataTypes.STRING,
    address: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Organization',
  });
  return Organization;
};
