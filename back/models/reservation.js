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
        defaultValue: 4,
        allowNull: false,
      },
    },
    {
      hooks: {
        afterCreate: async (reservation, options) => {
          await sequelize.models.schedule.update(
            {
              reserved: sequelize.literal(
                `reserved + ${reservation.dataValues.personnel}`
              ),
            },
            { where: { id: reservation.dataValues.scheduleId } }
          );
        },
        afterUpdate: async (reservation, options) => {
          if (reservation.dataValues.state === 3) {
            await sequelize.models.schedule.update(
              {
                reserved: sequelize.literal(
                  `reserved - ${reservation.dataValues.personnel}`
                ),
              },
              { where: { id: reservation.dataValues.scheduleId } }
            );
          }
        },
      },
    }
  );
};
