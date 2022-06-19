module.exports = (sequelize, DataTypes) => {
  return sequelize.define("comment", {
    text: {
      type: DataTypes.STRING(50),
    },
  });
};
