module.exports = (sequelize, DataTypes) => {
  return sequelize.define("reservation", {
    name: {
      type: DataTypes.STRING(12),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(11),
      allowNull: false,
    },
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
