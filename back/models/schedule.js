module.exports = (sequelize, DataTypes) => {
  return sequelize.define("schedule", {
    date: {
      type: DataTypes.STRING(8),
      allowNull: false,
    },
    start: {
      type: DataTypes.STRING(4),
      allowNull: false,
    },
    end: {
      type: DataTypes.STRING(4),
      allowNull: false,
    },
    students: {
      type: DataTypes.INTEGER,
    },
    booked: {
      type: DataTypes.INTEGER,
    },
  });
};
