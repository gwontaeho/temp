module.exports = (sequelize, DataTypes) => {
  return sequelize.define("image", {
    path: {
      type: DataTypes.STRING(100),
    },
  });
};
