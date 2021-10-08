module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "schedule",
    {
      ymd: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      time: {
        type: DataTypes.STRING(8),
        allowNull: false,
      },
      personnel: {
        type: DataTypes.INTEGER,
      },
      reserved: {
        type: DataTypes.INTEGER,
      },
      state: {
        type: DataTypes.INTEGER,
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
                },
              }
            );
            try {
              await sequelize.models.class.update(
                {
                  sold: sequelize.literal(`sold + ${updateReservation[0]}`),
                },
                { where: { id: schedule.dataValues.classId } }
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
