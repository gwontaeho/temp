module.exports = (sequelize, DataTypes) => {
  return sequelize.define("class", {
    name: {
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
    address: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    detail: {
      type: DataTypes.TEXT,
    },
    sold: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    category: {
      type: DataTypes.STRING(12),
    },
    index: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
