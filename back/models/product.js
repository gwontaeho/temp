module.exports = (sequelize, DataTypes) => {
  return sequelize.define("product", {
    name: {
      type: DataTypes.STRING(12),
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    time: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING(120),
      allowNull: false,
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
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING(12),
      allowNull: false,
    },
  });
};
