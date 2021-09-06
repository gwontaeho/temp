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
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require("./user")(sequelize, Sequelize);
db.Seller = require("./seller")(sequelize, Sequelize);
db.Class = require("./class")(sequelize, Sequelize);
db.Schedule = require("./schedule")(sequelize, Sequelize);
db.Reservation = require("./reservation")(sequelize, Sequelize);
db.Review = require("./review")(sequelize, Sequelize);

db.Seller.hasMany(db.Class, { foreignKey: { allowNull: false } });
db.Class.belongsTo(db.Seller);
db.Seller.hasMany(db.Reservation, { foreignKey: { allowNull: false } });
db.Reservation.belongsTo(db.Seller);

db.User.hasMany(db.Reservation, { foreignKey: { allowNull: false } });
db.Reservation.belongsTo(db.User);
db.User.hasMany(db.Review, { foreignKey: { allowNull: false } });
db.Review.belongsTo(db.User);

db.Class.hasMany(db.Schedule, { foreignKey: { allowNull: false } });
db.Schedule.belongsTo(db.Class);
db.Class.hasMany(db.Reservation, { foreignKey: { allowNull: false } });
db.Reservation.belongsTo(db.Class);
db.Class.hasMany(db.Review, { foreignKey: { allowNull: false } });
db.Review.belongsTo(db.Class);

db.Reservation.hasOne(db.Review, { foreignKey: { allowNull: false } });
db.Review.belongsTo(db.Reservation);

db.Schedule.hasMany(db.Reservation, { foreignKey: { allowNull: false } });
db.Reservation.belongsTo(db.Schedule);

module.exports = db;
