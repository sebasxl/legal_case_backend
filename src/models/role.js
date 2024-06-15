'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      // Definir asociación aquí
      Role.hasMany(models.User, { foreignKey: 'roleId', as: 'users' });
    }
  }
  Role.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};
