module.exports = (sequelize, DataTypes) => {
  return sequelize.define("schedule", {
    time: {
      type: DataTypes.STRING(16),
      allowNull: false,
    },
    personnel: {
      type: DataTypes.INTEGER,
    },
    reserved: {
      type: DataTypes.INTEGER,
    },
  });
};
