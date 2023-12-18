module.exports = (sequelize, DataTypes) => {
  return sequelize.define("exp", {
    point: {
      type: DataTypes.INTEGER,
    },
  });
};
