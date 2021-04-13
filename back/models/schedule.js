module.exports = (sequelize, DataTypes) => {
  return sequelize.define("schedule", {
    schedule: {
      type: DataTypes.STRING(24),
      allowNull: false,
    },
    students: {
      type: DataTypes.STRING(24),
    },
    booked: {
      type: DataTypes.STRING(24),
    },
  });
};
