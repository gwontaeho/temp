module.exports = (sequelize, DataTypes) => {
  return sequelize.define("seller", {
    seller: {
      type: DataTypes.STRING(12),
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING(24),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(12),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(11),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(60),
      allowNull: false,
    },
    reg: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true,
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
