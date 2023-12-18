module.exports = (sequelize, DataTypes) => {
  return sequelize.define("user", {
    phone: {
      type: DataTypes.STRING(11),
      unique: true,
    },
    fb_phone: {
      type: DataTypes.STRING(20),
      unique: true,
    },
    fb_uid: {
      type: DataTypes.STRING(40),
      unique: true,
    },
    nickname: {
      type: DataTypes.STRING(10),
      unique: true,
    },
  });
};
