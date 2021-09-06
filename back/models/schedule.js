module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "schedule",
    {
      time: {
        type: DataTypes.STRING(16),
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
          console.log("아아아");
          console.log(options);
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
            console.log("-;;;;;;;;;;;;;;;");
            try {
              const updateClass = await sequelize.models.class.update(
                {
                  sold: sequelize.literal(`sold + ${updateReservation[0]}`),
                },
                { where: { id: schedule.dataValues.classId } }
              );
              console.log("업데이트클래스");
              console.log(updateClass);
            } catch (error) {
              console.log(error);
            }
            console.log(updateReservation[0]);
          } catch (error) {
            console.log(error);
          }
        },
      },
    }
  );
};
