module.exports = (sequelize, DataTypes) => {
  return sequelize.define("reservation", {
    personnel: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    review: {
      type: DataTypes.TEXT,
    },
    point: {
      type: DataTypes.INTEGER,
    },
    state: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });
};
