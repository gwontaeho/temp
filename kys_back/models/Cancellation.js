module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Cancellation", {
        seq: {
            type: DataTypes.INTEGER,
        },
    });
};
