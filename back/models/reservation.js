module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "reservation",
    {
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
      state: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      hooks: {
        afterCreate: (reservation, options) => {
          console.log("abcbcbcddddddcreate");
          sequelize.models.schedule.update(
            {
              reserved: sequelize.literal(
                `reserved + ${reservation.dataValues.personnel}`
              ),
            },
            { where: { id: reservation.dataValues.scheduleId } }
          );
        },
      },
    }
  );
};
