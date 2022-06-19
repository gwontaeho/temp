module.exports = (sequelize, DataTypes) => {
  return sequelize.define("job", {
    type: {
      type: DataTypes.STRING(10),
    },
  });
};
