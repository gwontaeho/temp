module.exports = (sequelize, DataTypes) => {
  return sequelize.define("post", {
    text: {
      type: DataTypes.STRING(100),
    },
  });
};
