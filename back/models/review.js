module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "review",
    {
      text: {
        type: DataTypes.TEXT,
      },
      rating: {
        type: DataTypes.INTEGER,
      },
    },
    {
      hooks: {
        afterCreate: async (review, options) => {
          await sequelize.models.reservation.update(
            {
              state: 5,
            },
            { where: { id: review.dataValues.reservationId } }
          );
        },
      },
    }
  );
};
