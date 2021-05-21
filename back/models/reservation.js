module.exports = (sequelize, DataTypes) => {
  return sequelize.define("reservation", {
    user: {
      type: DataTypes.STRING(12),
      allowNull: false,
    },
    seller: {
      type: DataTypes.STRING(12),
      allowNull: false,
    },
    class_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    schedule_id: {
      type: DataTypes.INTEGER,
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
      allowNull: false,
    },
  });
};
