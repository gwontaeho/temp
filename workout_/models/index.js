"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js";
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

db.user.hasOne(db.job, { foreignKey: { allowNull: false } });
db.job.belongsTo(db.user);
db.user.hasOne(db.exp, { foreignKey: { allowNull: false } });
db.exp.belongsTo(db.user);
db.user.hasOne(db.image);
db.image.belongsTo(db.user);
db.user.hasMany(db.post, { foreignKey: { allowNull: false } });
db.post.belongsTo(db.user);
db.user.hasMany(db.follow, { foreignKey: { name: "follower", allowNull: false } });
db.user.hasMany(db.follow, { foreignKey: { name: "following", allowNull: false } });
db.user.hasMany(db.comment, { foreignKey: { allowNull: false } });
db.comment.belongsTo(db.user);
db.user.hasMany(db.like, { foreignKey: { allowNull: false } });
db.like.belongsTo(db.user);

db.post.hasMany(db.image);
db.image.belongsTo(db.post);
db.post.hasMany(db.comment, { foreignKey: { allowNull: false } });
db.comment.belongsTo(db.post);
db.post.hasMany(db.like, { foreignKey: { allowNull: false } });
db.like.belongsTo(db.post);

db.exp.hasOne(db.exp_history, { foreignKey: { allowNull: false } });
db.exp_history.belongsTo(db.exp);

db.comment.hasOne(db.comment);
db.comment.belongsTo(db.comment);
