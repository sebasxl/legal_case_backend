const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Definir relaciones aquí
db.Role.hasMany(db.User, { foreignKey: 'roleId' });
db.User.belongsTo(db.Role, { foreignKey: 'roleId' });

db.Organization.hasMany(db.User, { foreignKey: 'organizationId' });
db.User.belongsTo(db.Organization, { foreignKey: 'organizationId' });

db.Client.hasMany(db.Case, { foreignKey: 'clientId' });
db.Case.belongsTo(db.Client, { foreignKey: 'clientId' });

db.CaseType.hasMany(db.Case, { foreignKey: 'typeId' });
db.Case.belongsTo(db.CaseType, { foreignKey: 'typeId' });

db.Status.hasMany(db.Case, { foreignKey: 'statusId' });
db.Case.belongsTo(db.Status, { foreignKey: 'statusId' });

db.Case.hasMany(db.TimelineEntry, { foreignKey: 'caseId' });
db.TimelineEntry.belongsTo(db.Case, { foreignKey: 'caseId' });

db.User.hasMany(db.TimelineEntry, { foreignKey: 'userId' });
db.TimelineEntry.belongsTo(db.User, { foreignKey: 'userId' });

db.Category.hasMany(db.TimelineEntry, { foreignKey: 'categoryId' });
db.TimelineEntry.belongsTo(db.Category, { foreignKey: 'categoryId' });

db.TimelineEntry.hasMany(db.Attachment, { foreignKey: 'timelineEntryId' });
db.Attachment.belongsTo(db.TimelineEntry, { foreignKey: 'timelineEntryId' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
