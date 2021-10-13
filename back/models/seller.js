module.exports = (sequelize, DataTypes) => {
  return sequelize.define("seller", {
    id: {
      type: DataTypes.STRING(12),
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING(24),
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING(12),
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
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    reg: {
      type: DataTypes.STRING(10),
      allowNull: false,
      unique: true,
    },
    category: {
      type: DataTypes.STRING(12),
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
  });
};
