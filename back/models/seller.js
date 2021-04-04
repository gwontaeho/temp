module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "seller",
    {
      company: {
        type: DataTypes.STRING(12),
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
      category: {
        type: DataTypes.STRING(24),
        allowNull: false,
      },
    },
    {
      hooks: {
        afterCreate: (seller, options) => {
          sequelize.models.user.update(
            {
              type: 2,
            },
            {
              where: {
                user: seller.userUser,
              },
            }
          );
        },
      },
    }
  );
};
