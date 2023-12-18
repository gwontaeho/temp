module.exports = (sequelize, DataTypes) => {
  return sequelize.define("exp_history", {
    point: {
      type: DataTypes.INTEGER,
    },
  });
};
