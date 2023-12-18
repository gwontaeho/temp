module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "schedule",
    {
      ymd: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      start: {
        type: DataTypes.STRING(4),
        allowNull: false,
      },
      end: {
        type: DataTypes.STRING(4),
        allowNull: false,
      },
      personnel: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      reserved: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      state: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      hooks: {
        afterUpdate: async (schedule, options) => {
          try {
            const updateReservation = await sequelize.models.reservation.update(
              {
                state: 1,
              },
              {
                where: {
                  scheduleId: schedule.dataValues.id,
                  state: 0,
                },
              }
            );
            try {
              await sequelize.models.product.update(
                {
                  sold: sequelize.literal(`sold + ${updateReservation[0]}`),
                },
                { where: { id: schedule.dataValues.productId } }
              );
            } catch (error) {
              console.log(error);
            }
          } catch (error) {
            console.log(error);
          }
        },
      },
    }
  );
};
