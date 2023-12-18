module.exports = (sequelize, DataTypes) => {
  return sequelize.define("product", {
    name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    intro: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    img: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING(10),
      defaultValue: 0,
      allowNull: false,
    },
    buyer: {
      type: DataTypes.STRING(10),
    },
  });
};
