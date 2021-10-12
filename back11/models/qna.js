module.exports = (sequelize, DataTypes) => {
  return sequelize.define("qna", {
    question: {
      type: DataTypes.TEXT,
    },
    answer: {
      type: DataTypes.TEXT,
    },
    state: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
  });
};
