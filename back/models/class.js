module.exports = (sequelize, DataTypes) => {
  return sequelize.define("class", {
    class: {
      type: DataTypes.STRING(12),
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING(24),
      allowNull: false,
    },
    time: {
      type: DataTypes.STRING(12),
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING(120),
    },
    text: {
      type: DataTypes.TEXT,
    },
    index: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
