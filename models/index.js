"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    console.log(config);
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

db.User.hasOne(db.Company);
db.Company.belongsTo(db.User);

db.User.hasMany(db.Request);
db.User.hasMany(db.Request, { as: "Requests_target", foreignKey: "TargetId" });
db.Request.belongsTo(db.User);
db.Request.belongsTo(db.User, { as: "Target" });

db.User.hasMany(db.Review);
db.User.hasMany(db.Review, { as: "Reviews_target", foreignKey: "TargetId" });
db.Review.belongsTo(db.User);
db.Review.belongsTo(db.User, { as: "Target" });

db.Request.hasOne(db.Review);
db.Review.belongsTo(db.Request);

db.User.hasMany(db.Blacklist);
db.User.hasMany(db.Blacklist, { as: "Blacklists_target", foreignKey: "TargetId" });
db.Blacklist.belongsTo(db.User);
db.Blacklist.belongsTo(db.User, { as: "Target" });

db.Company.hasMany(db.Price);
db.Price.belongsTo(db.Company);

db.User.hasMany(db.Cancellation);
db.Cancellation.belongsTo(db.User);
